import React from 'react';
import ContentLoader from 'react-content-loader';
const windowWidth = window.innerWidth;
const NestedList = (props) => (
	<div className="p-3">
		<ContentLoader
			viewBox="0 0 400 130"
			height={130}
			width={windowWidth * 0.7}
			backgroundColor={'#2786e9'}
			foregroundColor={'#2786e92e'}
			{...props}
		>
			<rect x="0" y="0" rx="3" ry="3" width={windowWidth * 0.69} height="10" />
			<rect x="20" y="20" rx="3" ry="3" width={windowWidth * 0.69} height="10" />
			<rect x="20" y="40" rx="3" ry="3" width={windowWidth * 0.69} height="10" />
			<rect x="0" y="60" rx="3" ry="3" width={windowWidth * 0.69} height="10" />
			<rect x="20" y="80" rx="3" ry="3" width={windowWidth * 0.69} height="10" />
			<rect x="20" y="100" rx="3" ry="3" width={windowWidth * 0.69} height="10" />
		</ContentLoader>
	</div>
);

NestedList.metadata = {
	name: 'DaniloWoz',
	github: 'danilowoz',
	description: 'Nested list',
	filename: 'NestedList',
};

export default NestedList;
