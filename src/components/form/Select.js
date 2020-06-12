import React from 'react';

export default ({ register, options, name, ...rest }) => {
  return (
    <select name={name} ref={register} {...rest}>
      {options.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
};
