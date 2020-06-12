import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from 'store/messages/actions';

const Message = ({ item }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(clearMessage(item.id)), 4000);
  });

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
    </React.Fragment>
  );
}
