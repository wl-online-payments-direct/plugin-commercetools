import PropTypes from 'prop-types';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { BackIcon } from '@commercetools-uikit/icons';
import Snackbar from '@mui/material/Snackbar';
import { useIntl } from 'react-intl';
import { postCancelPayment } from '../../ct-methods';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useContext, useState } from 'react';
import { OrderContext } from '../../context/order';
import TransactionDetails from './transaction-details';
import TransactionList from './transaction-list';
import messages from './messages';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const CancelAmount = ({
  emailId,
  orderId,
  paymentId,
  amount,
  status,
  worldlineId,
  storeId,
  currencyCode,
  alreadyCancelledAmount,
  transactionList,
}) => {
  const { formatMessage } = useIntl();
  const [cancelAmount, setCancelAmount] = useState();
  const [cancelErrorMessage, setCancelErrorMessage] = useState('');
  const [seeTransactions, setSeeTransactions] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const match = useRouteMatch();
  const basePathArray = match.url.split('/');
  basePathArray.pop();
  const backToOrderPath = basePathArray.join('/');
  const projectKey = useApplicationContext((context) => context.project.key);
  const apiHost = useApplicationContext(
    (context) => context.environment.apiHost
  );
  const { setTransactionRequested } = useContext(OrderContext);

  const cancelPayment = async () => {
    setCancelErrorMessage('');
    if (!cancelAmount) {
      setCancelErrorMessage(`Value must not be empty`);
      return;
    }
    try {
      setLoading(true);
      setTransactionRequested(false);
      const payload = {
        storeId: storeId,
        amount: parseInt(cancelAmount * 100),
        paymentId: worldlineId,
        orderId: orderId,
        currencyCode: currencyCode,
      };
      const response = await postCancelPayment(apiHost, projectKey, payload);
      if (response.statusCode === 200) {
        setOpenSnackbar(true);
        setSnackbarMessage(formatMessage(messages.cancelInProgress));
        setTransactionRequested(true);
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage(formatMessage(messages.cancelFailed));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setOpenSnackbar(true);
      setSnackbarMessage(formatMessage(messages.cancelFailed));
      console.log(error);
    }
  };
  const changeCancelAmount = (e) => {
    const { value } = e.target;
    setCancelAmount(value);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <div className="back-to-orders">
        <Link to={`${backToOrderPath}`} className="back-link">
          <BackIcon /> {formatMessage(messages.backToOrder)}
        </Link>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <div className="transaction-wrapper">
        <h2>{formatMessage(messages.cancelTitle)}</h2>
        <div className="transaction-details-wrapper">
          <TransactionDetails
            emailId={emailId}
            paymentId={paymentId}
            amount={(amount / 100).toFixed(2)}
            status={status}
          />
          <div className="transaction-form-wrapper">
            <div className="transaction-form">
              <div className="input-block">
                <p className="input-label">
                  {formatMessage(messages.amountToCancel)}
                </p>
                <input
                  type="number"
                  name="cancelAmount"
                  value={cancelAmount}
                  onChange={changeCancelAmount}
                  className="transaction-input"
                  id="cancelAmount"
                  required
                />
              </div>
              <div className="transaction-button" onClick={cancelPayment}>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <PrimaryButton label={formatMessage(messages.cancel)} />
                )}
              </div>
            </div>
            <div className="transacation-details">
              {formatMessage(messages.amountCancelledAlready)}{' '}
              <b>
                {currencyCode} {(alreadyCancelledAmount / 100).toFixed(2)}
              </b>
              <p
                className="see-transaction-link"
                onClick={() => setSeeTransactions(true)}
              >
                {formatMessage(messages.seeTransactions)}
              </p>
            </div>
          </div>
          <p className="error-message">{cancelErrorMessage}</p>
        </div>
      </div>
      {seeTransactions && (
        <div className="transaction-list-wrapper">
          <div className="transaction-list-title">
            <h4>{formatMessage(messages.cancelAmount)}</h4>
            <h4>{formatMessage(messages.cancelStatus)}</h4>
            <h4>{formatMessage(messages.createdDate)}</h4>
          </div>
          <TransactionList transactionList={transactionList} />
        </div>
      )}
    </>
  );
};

export default CancelAmount;

CancelAmount.propTypes = {
  emailId: PropTypes.string,
  orderId: PropTypes.string,
  paymentId: PropTypes.string,
  amount: PropTypes.string,
  status: PropTypes.string,
  worldlineId: PropTypes.string,
  storeId: PropTypes.string,
  currencyCode: PropTypes.string,
  alreadyCancelledAmount: PropTypes.string,
  transactionList: PropTypes.array,
};
