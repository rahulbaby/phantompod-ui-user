import React from 'react';
import { WrapperNoAuth } from 'components/wrappers';
import { Message } from '../components';

const LayoutAuth = (props) => {
	return (
		<div className="signin-wrapper  ">
			<div className="login-wrap ">
				<div className="login-logo">
					<img src="/img/logo.png" alt="" />
				</div>
				{props.children || null}
			</div>
		</div>
	);
};

export default (props) => (
	<WrapperNoAuth>
		<Message />
		<LayoutAuth {...props} />
	</WrapperNoAuth>
);
