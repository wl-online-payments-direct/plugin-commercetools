import { useState, useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import messages from './messages';
import { retryOrderPayment } from '../../ct-methods';
import { PaymentContext } from '../../context/payment';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const RetryAlert = ({ isOpen, handleRetryClose, id }) => {
  const { formatMessage } = useIntl();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const projectKey = useApplicationContext((context) => context.project.key);
  const apiHost = useApplicationContext(
    (context) => context.environment.apiHost
  );
  const { activeStore } = useContext(PaymentContext);
  const [loading, setLoading] = useState(false);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRetry = async () => {
    setLoading(true);
    const { key: storeId } = activeStore;
    try {
      const payload = {
        storeId: storeId,
        id: id,
      };
      const response = await retryOrderPayment(apiHost, projectKey, payload);
      setLoading(false);
      handleRetryClose();
      if (response.statusCode === 200) {
        setOpenSnackbar(true);
        setSnackbarMessage(formatMessage(messages.retrySuccess));
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage(formatMessage(messages.retryFailed));
      }
    } catch (e) {
      setLoading(false);
      handleRetryClose();
      setOpenSnackbar(true);
      setSnackbarMessage(formatMessage(messages.retryFailed));
      console.error(e);
    }
  };
  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <Dialog
        open={isOpen}
        onClose={handleRetryClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {formatMessage(messages.retryModalMessage)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleRetryClose} className="retry-button">
            {formatMessage(messages.cancelModalCancel)}
          </button>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <button
              onClick={handleRetry}
              autoFocus
              className="retry-agree-button"
            >
              {formatMessage(messages.retryModalOk)}
            </button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RetryAlert;

RetryAlert.propTypes = {
  isOpen: PropTypes.bool,
  handleRetryClose: PropTypes.func,
  id: PropTypes.string,
};
