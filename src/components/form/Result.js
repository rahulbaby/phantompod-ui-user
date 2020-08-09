import React from 'react';

export default (props) => {
  const { result, errors } = props;
  if (errors && Object.keys(errors).length)
    return (
      <div className="alert alert-danger">
        <p className="mb-0">
          {Object.keys(errors).map((x, i) => (
            <div key={i}>{`${errors[x].message}`}</div>
          ))}
        </p>
      </div>
    );

  if (!result) return null;
  const { error, message, messageArr } = result;
  let errorMsg = error && error._message ? error._message : false;
  let messageDefault = error ? 'Something went wrong!' : 'Success';
  let severity = error ? 'error' : 'success';

  return (
    <div className="alert alert-danger">
      <span className="alert-heading">{errorMsg || message || messageDefault}</span>
      {messageArr && messageArr.length > 0 && <hr />}
      <p className="mb-0">
        {messageArr !== undefined &&
          Object.keys(messageArr).map((x, i) => <div key={i}>{`${messageArr[x].message}`}</div>)}
      </p>
    </div>
  );
};
