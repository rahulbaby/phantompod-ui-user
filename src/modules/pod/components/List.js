import React, { Fragment } from 'react';
import { EmptyNotice } from 'components/common';

import PodRow from './Row';
const PodList = ({ loading, rows }) => {
	return (
		<Fragment>
			{!loading && rows.length === 0 && <EmptyNotice title="No pods avialable now." />}
			{rows.map((x, i) => (
				<PodRow count={i + 1} row={x} key={x.id.toString()} />
			))}
		</Fragment>
	);
};

export default PodList;
