import React from 'react';

export default ({ register, options, name, label, ...rest }) => {
	return (
		<select name={name} ref={register} {...rest}>
			<option value="">{label}</option>
			{options.map((value, idx) => (
				<option value={value} key={idx}>
					{value}
				</option>
			))}
		</select>
	);
};
