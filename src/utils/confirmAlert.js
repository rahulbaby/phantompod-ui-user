import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default (props) =>
  confirmAlert({
    title: props.title || 'Please Confirm',
    message: props.message || 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => props.onConfirm && props.onConfirm(),
      },
      {
        label: 'No',
        onClick: () => props.onCancel && props.onCancel(),
      },
    ],
  });
