import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from 'store/messages/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = ({ item }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //setTimeout(() => dispatch(clearMessage(item.id)), 4000);

    if (item.text)
      toast(item.text, {
        // onClose: () => dispatch(clearMessage(item.id)),
        className: `text-white bg-${item.severity || 'dark'}`,
      });
    dispatch(clearMessage(item.id));
  });
  return null;

  return (
    <div className={`alert alert-${item.severity || 'primary'}`} role="alert">
      {item.text}
    </div>
  );
};

export default function ActionAlerts() {
  const messages = useSelector(({ messages }) => messages.rows);

  return (
    <React.Fragment>
      {messages.map((x, i) => (
        <Message item={x} key={i} />
      ))}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
}
