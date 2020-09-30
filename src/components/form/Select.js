import React from 'react';
export default ({ register, options, name, label,valKey, labelKey ,rest }) => {
  let optionsArr = {};

  if (options)
    options.map((x) => {
      if (typeof x === 'object') optionsArr[x[valKey || 'id']] = x[labelKey || valKey || 'name'];
      else optionsArr[x] = x;
    });

	return (
		<select className="form-control" name={name} ref={register} {...rest}>
			<option value="">{label}</option>
			{Object.keys(optionsArr).map((x) =>(
				<option value={x} key={x.toString()}>
					{optionsArr[x]}
				</option>
			))}
		</select>
	);
};
