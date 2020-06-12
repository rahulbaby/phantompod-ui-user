import React from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

const LinkCustom = ({ children, to, className, classNameActive, activeOnlyWhenExact, ...rest }) => {
	let match = useRouteMatch({
		path: to,
		exact: activeOnlyWhenExact,
	});

	return (
		<RouterLink to={to} {...rest} className={match ? classNameActive || className : className}>
			{children}
		</RouterLink>
	);
};

export default LinkCustom;
