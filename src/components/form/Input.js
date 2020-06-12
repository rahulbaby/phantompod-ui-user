import React from 'react';

export default ({ register, name, label, placeholder, className, ...rest }) => (
	<input
		name={name}
		placeholder={placeholder || label}
		ref={register}
		className={`form-control ${className}`}
		{...rest}
	/>
);
