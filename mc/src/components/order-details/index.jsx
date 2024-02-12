import { useRouteMatch } from 'react-router'
import DataTable from '@commercetools-uikit/data-table';
import PageWrapper from '../page-wrapper';
import './style.css';
import { useEffect, useState } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { BackIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { getOrderDetails } from '../../ct-methods';
import { Link } from 'react-router-dom';
import { flattenObject } from '../../helpers';
import { MERCHANT_URL } from '../../constants';

const columns = [
    { key: 'paymentMethod', label: 'Payment Method' },
    { key: 'paymentId', label: 'Transaction Id' },
    { key: 'amount', label: 'Amount Paid' },
    { key: 'worldlineId', label: 'Worldline ID' },
    { key: 'status', label: 'Payment Status' },
    { key: 'cardNumber', label: 'Card Number' },
    { key: 'bin', label: 'Bin' },
    { key: 'fraudServiceResult', label: 'Fraud result' },
    { key: 'authenticationStatus', label: 'Authentication status' },
    { key: 'liability', label: 'Liability for 3DS' },
];

const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState(null)
    const [failedOrderDetails, setFailedOrderDetails] = useState(false)
    const match = useRouteMatch()
    const basePathArray = match.url.split('/')
    const orderId = basePathArray.pop()
    const backToOrderPath = basePathArray.join('/')
    const projectKey = useApplicationContext((context) => context.project.key);
    const apiHost = useApplicationContext(
        (context) => context.environment.apiHost
    );   
    
    const itemRenderer = (item, column) => {
        const itemValue = item[column.key]
        if (column.key === "worldlineId") {
            const link = <a href={`${MERCHANT_URL}/${projectKey}/orders`} target="_blank" rel="noopener noreferrer">{itemValue}</a>
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
    }, [apiHost, projectKey, orderId])

    if (failedOrderDetails) {
        return (
            <PageWrapper title={'Order details'}>
                <div className='failed-order'>
                    <div className='back-to-orders'>
                        <Link to={`${backToOrderPath}`} className='back-link'>
                            <BackIcon /> Back to order list
                        </Link>
                    </div>
                    <div>There are no orders for the Payment Id: {orderId}</div>
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper title={'Order details'}>
            <div className='order-details-wrapper'>
                <div className='back-to-orders'>
                    <Link to={`${backToOrderPath}`} className='back-link'>
                        <BackIcon /> Back to order list
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