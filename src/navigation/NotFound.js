import React from 'react';
import { LayoutMain } from 'layouts';

const NotFound = () => (
	<div style={{ textAlign: 'center', paddingTop: '20vh' }}>
		<h1>404</h1>
		<h5>NOT FOUND</h5>
	</div>
);

export default () => (
	<LayoutMain>
		<NotFound />
	</LayoutMain>
);
