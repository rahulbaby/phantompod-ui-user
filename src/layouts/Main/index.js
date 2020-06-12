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
				<WrapperAuth>{props.children || null}</WrapperAuth>
			</div>
		</React.Fragment>
	);
};

export default (props) => (
	<WrapperDataFetch>
		<LayoutMain {...props} />
	</WrapperDataFetch>
);
