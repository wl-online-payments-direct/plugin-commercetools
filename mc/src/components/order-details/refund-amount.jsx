import PropTypes from "prop-types"
import PrimaryButton from '@commercetools-uikit/primary-button';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { BackIcon } from '@commercetools-uikit/icons';
import Snackbar from '@mui/material/Snackbar';
import { useIntl } from 'react-intl';
import { postRefundPayment } from "../../ct-methods";
import { useApplicationContext } from "@commercetools-frontend/application-shell-connectors";
import { useContext, useState } from "react";
import { OrderContext } from "../../context/order";
import TransactionDetails from "./transaction-details";
import TransactionList from "./transaction-list";
import messages from "./messages";
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const RefundAmount = ({
    emailId, 
    orderId,
    paymentId, 
    amount, 
    status, 
    worldlineId, 
    storeId, 
    currencyCode, 
    alreadyCapturedAmount,
    transactionList
}) => {
    const {formatMessage} = useIntl()
    const [refundAmount, setRefundAmount] = useState()
    const [refundErrorMessage, setRefundErrorMessage] = useState('')
    const [seeTransactions, setSeeTransactions] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const match = useRouteMatch()
    const basePathArray = match.url.split('/')
    basePathArray.pop()
    const backToOrderPath = basePathArray.join('/')  
    const projectKey = useApplicationContext((context) => context.project.key);
    const apiHost = useApplicationContext(
        (context) => context.environment.apiHost
    );
    const {setTransactionRequested} = useContext(OrderContext)
    
    const refundPayment = async () => {
        setRefundErrorMessage('')
        if (!refundAmount) {
            setRefundErrorMessage(`Value must not be empty`)
            return
        }
        try {
            setLoading(true)
            setTransactionRequested(false)
            const payload = {
                storeId: storeId,
                amount: parseInt(refundAmount),
                paymentId: worldlineId,
                orderId: orderId,
                currencyCode: currencyCode
            }
            const response = await postRefundPayment(apiHost, projectKey, payload)
            if (response.statusCode === 200) {
                const {result} = response
                if (result.status === 'REFUND_REQUESTED') {
                    setOpenSnackbar(true)
                    setSnackbarMessage(formatMessage(messages.refundInProgress))
                    setTransactionRequested(true)
                }
            } else {
                setOpenSnackbar(true)
                setSnackbarMessage(formatMessage(messages.refundFailed))
            }
            setLoading(false)
        } catch (error) {
            setSnackbarMessage(formatMessage(messages.refundFailed))
            setLoading(false)
            console.log(error)
        }        
    }
    const changeRefundAmount = (e) => {
        const {value} = e.target
        setRefundAmount(value)
    }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }
    return (
        <>
            <div className='back-to-orders'>
                <Link to={`${backToOrderPath}`} className='back-link'>
                    <BackIcon /> {formatMessage(messages.backToOrder)}
                </Link>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <div className='transaction-wrapper'>            
                <h2>{formatMessage(messages.refundTitle)}</h2>
                <div className='transaction-details-wrapper'>
                    <TransactionDetails
                        emailId={emailId}
                        paymentId={paymentId}
                        amount={amount}
                        status={status}
                    />
                    <div className="transaction-form-wrapper">
                        <div className='transaction-form'>
                            <div className="input-block">
                                <p className="input-label">{formatMessage(messages.amountToRefund)}</p>
                                <input
                                    type="number"
                                    name="refundAmount"
                                    value={refundAmount}
                                    onChange={changeRefundAmount}
                                    className="transaction-input"
                                    id="refundAmount"
                                    required
                                />
                            </div>
                            <div className="transaction-button" onClick={refundPayment}>
                                {loading ? <LoadingSpinner /> : <PrimaryButton label={formatMessage(messages.refund)} />}
                            </div>
                        </div>
                        <div className="transacation-details">
                            {formatMessage(messages.amountRefundedAlready)} <b>{currencyCode} {alreadyCapturedAmount}</b>
                            <p className="see-transaction-link" onClick={() => setSeeTransactions(true)}>
                                {formatMessage(messages.seeTransactions)}
                            </p>
                        </div>
                    </div>
                    <p className="error-message">{refundErrorMessage}</p>
                </div>
            </div>
            {seeTransactions && (
                <div className="transaction-list-wrapper">
                    <div className="transaction-list-title">
                        <h4>{formatMessage(messages.refundAmount)}</h4>
                        <h4>{formatMessage(messages.refundStatus)}</h4>
                        <h4>{formatMessage(messages.createdDate)}</h4>
                    </div>
                    <TransactionList transactionList={transactionList} />
                </div>
            )}
        </>
    )
}

export default RefundAmount

RefundAmount.propTypes = {
    emailId: PropTypes.string,
    orderId: PropTypes.string,
    paymentId: PropTypes.string,
    amount: PropTypes.string,
    status: PropTypes.string,
    worldlineId: PropTypes.string,
    storeId: PropTypes.string,
    currencyCode: PropTypes.string,
    alreadyCapturedAmount: PropTypes.string,
    transactionList: PropTypes.array
};