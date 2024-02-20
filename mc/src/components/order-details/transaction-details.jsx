import PropTypes from "prop-types"
import { useIntl } from 'react-intl';
import messages from "./messages";

const TransactionDetails = ({emailId, paymentId, amount, status}) => {
    const {formatMessage} = useIntl()
    return (
        <div className='transaction-order-details'>
            <div className="details-col">
                <h4>{formatMessage(messages.email)}</h4>
                <p>{emailId}</p>
            </div>
            <div className="details-col">
                <h4>{formatMessage(messages.paymentId)}</h4>
                <p>{paymentId}</p>
            </div>
            <div className="details-col">
                <h4>{formatMessage(messages.amount)}</h4>
                <p>{amount}</p>
            </div>
            <div className="details-col">
                <h4>{formatMessage(messages.status)}</h4>
                <p className="status-field">{status}</p>
            </div>
        </div>
    )
}

export default TransactionDetails

TransactionDetails.propTypes = {
    emailId: PropTypes.string,
    paymentId: PropTypes.string,
    amount: PropTypes.string,
    status: PropTypes.string
};