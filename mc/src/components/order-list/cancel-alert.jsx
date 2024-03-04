import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import messages from './messages';

const CancelAlert = ({ isOpen, handleClose, handleCancelAgree }) => {
  const { formatMessage } = useIntl();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {formatMessage(messages.cancelModalMessage)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose} className="cancel-button">
          {formatMessage(messages.cancelModalCancel)}
        </button>
        <button
          onClick={handleCancelAgree}
          autoFocus
          className="cancel-agree-button"
        >
          {formatMessage(messages.cancelModalOk)}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelAlert;

CancelAlert.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  handleCancelAgree: PropTypes.func,
  merchantUrl: PropTypes.string,
};
