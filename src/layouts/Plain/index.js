import React from 'react';
import { Message } from '../components';

const LayoutPlain = (props) => {
	return (
		<React.Fragment>
			<div>
				<Message />
				{props.children || null}
			</div>
		</React.Fragment>
	);
};

export default (props) => <LayoutPlain {...props} />;
