import React, { Fragment } from 'react';
import { EmptyNotice } from 'components/common';

import PodRow from './Row';
const PodList = ({ loading, rows }) => {
	return (
		<Fragment>
			{!loading && rows.length === 0 && (
				<EmptyNotice
					title="You are not a member of any Pods!"
					subTitle="Join Pods or create your own Pod to start using Phantompod."
				/>
			)}
			{rows.map((x, i) => (
				<PodRow count={i + 1} row={x} key={x._id.toString()} />
			))}
		</Fragment>
	);
};

export default PodList;
