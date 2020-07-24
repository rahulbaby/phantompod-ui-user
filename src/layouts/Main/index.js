import React from 'react';
import { WrapperAuth, WrapperDataFetch } from 'components/wrappers';
import Header from './Header';
import Nav from './Nav';
import { Message } from '../components';

const LayoutMain = (props) => {
	return (
		<React.Fragment>
			<Nav />
			<Header />
			<div className="wrapper">
				<Message />
				{props.children || null}
			</div>
		</React.Fragment>
	);
};

export default (props) => (
	<WrapperDataFetch>
		<WrapperAuth>
			<LayoutMain {...props} />
		</WrapperAuth>
	</WrapperDataFetch>
);
