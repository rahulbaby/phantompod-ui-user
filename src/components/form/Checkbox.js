import React from 'react';

export default ({ name, register, label, className, ...rest }) => (
	<label className={`${className || ''} checkbox-container`}>
		<input type="checkbox" name={name} ref={register} {...rest} />
		<span className="checkmark"></span> {label || 'label missing'}
	</label>
);
