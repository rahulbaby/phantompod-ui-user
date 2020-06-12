import React from 'react';

export default ({ register, name, placeholder, label, className, ...rest }) => (
	<textarea
		name={name}
		ref={register}
		className={`form-control ${className}`}
		placeholder={placeholder || label}
		{...rest}
	></textarea>
);
