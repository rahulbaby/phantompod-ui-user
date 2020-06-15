import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Button from './Button';

export default (props) => {
  const { title, message, onConfirm, onCancel, ...rest } = props;
  return (
    <Button
      className="btn small-btn btn-danger"
      onClick={() => {
        confirmAlert({
          title: title || 'Please Confirm',
          message: message || 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => onConfirm && onConfirm(),
            },
            {
              label: 'No',
              onClick: () => onCancel && onCancel(),
            },
          ],
        });
      }}
      {...rest}
    />
  );
};
