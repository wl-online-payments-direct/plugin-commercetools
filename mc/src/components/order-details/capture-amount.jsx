import PropTypes from 'prop-types';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { BackIcon } from '@commercetools-uikit/icons';
import Snackbar from '@mui/material/Snackbar';
import { useIntl } from 'react-intl';
import { postCapturePayment } from '../../ct-methods';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useContext, useState } from 'react';
import { OrderContext } from '../../context/order';
import TransactionDetails from './transaction-details';
import TransactionList from './transaction-list';
import messages from './messages';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const CaptureAmount = ({
  emailId,
  orderId,
  paymentId,
  amount,
  status,
  worldlineId,
  storeId,
  currencyCode,
  alreadyCapturedAmount,
  transactionList,
}) => {
  const { formatMessage } = useIntl();
  const [captureAmount, setCaptureAmount] = useState(0);
  const [captureErrorMessage, setCaptureErrorMessage] = useState('');
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

  const capturePayment = async () => {
    setCaptureErrorMessage('');
    if (!captureAmount) {
      setCaptureErrorMessage(`Value must not be empty`);
      return;
    }
    try {
      setLoading(true);
      setTransactionRequested(false);
      const payload = {
        storeId: storeId,
        amount: parseInt(captureAmount * 100),
        isFinal: true,
        paymentId: worldlineId,
        orderId: orderId,
      };
      const response = await postCapturePayment(apiHost, projectKey, payload);
      if (response.statusCode === 200) {
        const { result } = response;
        if (
          result.status === 'CAPTURE_REQUESTED' ||
          result.status === 'CAPTURED'
        ) {
          setOpenSnackbar(true);
          setSnackbarMessage(formatMessage(messages.captureInProgress));
          setTransactionRequested(true);
        }
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage(formatMessage(messages.captureFailed));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setOpenSnackbar(true);
      setSnackbarMessage(formatMessage(messages.captureFailed));
      console.log(error);
    }
  };
  const changeCaptureAmount = (e) => {
    const { value } = e.target;
    setCaptureAmount(value);
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
        <h2>{formatMessage(messages.captureTitle)}</h2>
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
                  {formatMessage(messages.amountToCapture)}
                </p>
                <input
                  type="number"
                  name="captureAmount"
                  value={captureAmount}
                  onChange={changeCaptureAmount}
                  className="transaction-input"
                  id="captureAmount"
                  required
                />
              </div>
              <div className="transaction-button" onClick={capturePayment}>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <PrimaryButton label={formatMessage(messages.capture)} />
                )}
              </div>
            </div>
            <div className="transacation-details">
              {formatMessage(messages.amountCapturedAlready)}{' '}
              <b>
                {currencyCode} {(alreadyCapturedAmount / 100).toFixed(2)}
              </b>
              <p
                className="see-transaction-link"
                onClick={() => setSeeTransactions(true)}
              >
                {formatMessage(messages.seeTransactions)}
              </p>
            </div>
          </div>
          <p className="error-message">{captureErrorMessage}</p>
        </div>
      </div>
      {seeTransactions && (
        <div className="transaction-list-wrapper">
          <div className="transaction-list-title">
            <h4>{formatMessage(messages.captureAmount)}</h4>
            <h4>{formatMessage(messages.captureStatus)}</h4>
            <h4>{formatMessage(messages.createdDate)}</h4>
          </div>
          <TransactionList transactionList={transactionList} />
        </div>
      )}
    </>
  );
};

export default CaptureAmount;

CaptureAmount.propTypes = {
  emailId: PropTypes.string,
  orderId: PropTypes.string,
  paymentId: PropTypes.string,
  amount: PropTypes.string,
  status: PropTypes.string,
  worldlineId: PropTypes.string,
  storeId: PropTypes.string,
  currencyCode: PropTypes.string,
  alreadyCapturedAmount: PropTypes.string,
  transactionList: PropTypes.array,
};
