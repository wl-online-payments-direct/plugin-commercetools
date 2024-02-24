import { useRouteMatch } from 'react-router'
import DataTable from '@commercetools-uikit/data-table';
import PageWrapper from '../page-wrapper';
import './style.css';
import { useContext, useEffect, useState } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { BackIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { FormattedMessage, useIntl } from 'react-intl';
import { getOrderDetails } from '../../ct-methods';
import { Link } from 'react-router-dom';
import { flattenObject } from '../../helpers';
import messages from './messages';
import { PaymentContext } from '../../context/payment';
import { OrderContext } from '../../context/order';
import CaptureAmount from './capture-amount';
import RefundAmount from './refund-amount';
import CancelAmount from './cancel-amount';

const OrderDetails = () => {
    const {formatMessage} = useIntl()
    const [orderDetails, setOrderDetails] = useState(null)
    const [failedOrderDetails, setFailedOrderDetails] = useState(false)
    const match = useRouteMatch()
    const basePathArray = match.url.split('/')
    const orderId = basePathArray.pop()
    const backToOrderPath = basePathArray.join('/')
    const projectKey = useApplicationContext((context) => context.project.key);
    const {apiHost} = useApplicationContext((context) => context.environment);

    const {activeStore} = useContext(PaymentContext)
    const {openCapture, openRefund, openCancel, transactionRequested} = useContext(OrderContext)
    
    const columns = [
        { key: 'paymentMethod', label: formatMessage(messages.paymentMethod) },
        { key: 'paymentId', label: formatMessage(messages.transactionId) },
        { key: 'amount', label: formatMessage(messages.amount) },
        { key: 'worldlineId', label: formatMessage(messages.worldlineId) },
        { key: 'status', label: formatMessage(messages.status) },
        { key: 'cardNumber', label: formatMessage(messages.cardNumber) },
        { key: 'bin', label: formatMessage(messages.bin) },
        { key: 'fraudServiceResult', label: formatMessage(messages.fraudServiceResult) },
        { key: 'authenticationStatus', label: formatMessage(messages.authenticationStatus) },
        { key: 'liability', label: formatMessage(messages.liability) },
    ];
    
    const itemRenderer = (item, column) => {
        const itemValue = item[column.key]
        if (column.key === "worldlineId") {
            const link = <a href={`/${projectKey}/orders/${item['orderId']}`} target="_blank" rel="noopener noreferrer">{itemValue}</a>
          return link
        }
        return itemValue;
    };

    useEffect(() => {
        if (!apiHost || !projectKey) return
        const fetchOrderDetails = async () => {
            try {
                setFailedOrderDetails(false)
                const response = await getOrderDetails(apiHost, projectKey, orderId)
                if (response.statusCode === 200) {
                    const {result} = response                                          
                    setOrderDetails(flattenObject(result))
                } else {
                    setFailedOrderDetails(true)
                }
            } catch (error) {
                setFailedOrderDetails(true)
            }
        }
        fetchOrderDetails()
    }, [apiHost, projectKey, orderId, transactionRequested])

    if (openCapture) {
        if (!orderDetails) return (
            <div className='loading-spinner'>
                <LoadingSpinner />
            </div>
        )
        return (
            <CaptureAmount
                emailId={orderDetails.customerEmail}
                orderId={orderDetails.orderId}
                paymentId={orderDetails.paymentId}
                amount={orderDetails.amount}
                status={orderDetails.status}  
                worldlineId={orderDetails.worldlineId} 
                storeId={activeStore.key}
                currencyCode={orderDetails.currencyCode}
                alreadyCapturedAmount={orderDetails.alreadyCapturedAmount}
                transactionList={orderDetails.Operations?.filter((operation) => operation.status === 'CAPTURED')}
            />
        )
    }

    if (openRefund) {
        if (!orderDetails) return (
            <div className='loading-spinner'>
                <LoadingSpinner />
            </div>
        )
        return (
            <RefundAmount
                emailId={orderDetails.customerEmail}
                orderId={orderDetails.orderId}
                paymentId={orderDetails.paymentId}
                amount={orderDetails.amount}
                status={orderDetails.status}  
                worldlineId={orderDetails.worldlineId} 
                storeId={activeStore.key}
                currencyCode={orderDetails.currencyCode}
                alreadyCapturedAmount={orderDetails.alreadyCapturedAmount}
                transactionList={orderDetails.Operations?.filter((operation) => operation.status === 'REFUNDED')}
            />
        )
    }

    if (openCancel) {
        if (!orderDetails) return (
            <div className='loading-spinner'>
                <LoadingSpinner />
            </div>
        )
        return (
            <CancelAmount
                emailId={orderDetails.customerEmail}
                orderId={orderDetails.orderId}
                paymentId={orderDetails.paymentId}
                amount={orderDetails.amount}
                status={orderDetails.status}  
                worldlineId={orderDetails.worldlineId} 
                storeId={activeStore.key}
                currencyCode={orderDetails.currencyCode}
                alreadyCancelledAmount={orderDetails.alreadyCancelledAmount}
                transactionList={orderDetails.Operations?.filter((operation) => operation.status === 'CANCELLED')}
            />
        )
    }

    if (failedOrderDetails) {
        return (
            <PageWrapper title={'Order details'}>
                <div className='failed-order'>
                    <div className='back-to-orders'>
                        <Link to={`${backToOrderPath}`} className='back-link'>
                            <BackIcon /> <FormattedMessage id="backToOrder" defaultMessage="Back to order list" />
                        </Link>
                    </div>
                    <div>
                        <FormattedMessage id="noOrders" defaultMessage="There are no orders for the Payment Id:" />
                        {orderId}
                    </div>
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper title={'Order details'}>
            <div className='order-details-wrapper'>
                <div className='back-to-orders'>
                    <Link to={`${backToOrderPath}`} className='back-link'>
                        <BackIcon /> <FormattedMessage id="backToOrder" defaultMessage="Back to order list" />
                    </Link>
                </div>
                {orderDetails ? (
                    <div className='order-details'>
                        <DataTable
                            columns={columns}
                            rows={[orderDetails]}
                            itemRenderer={(item, column) =>
                                itemRenderer(item, column)
                            }
                        />
                    </div>
                ) : (
                    <div className='loading-spinner'>
                        <LoadingSpinner />
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}

export default OrderDetails