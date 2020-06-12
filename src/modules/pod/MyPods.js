import React, { Fragment, useState, useEffect } from 'react';
import { LayoutMain } from 'layouts';
import { Button } from 'components/common';
import { useGetDbRows } from 'hooks';
import PodList from './components/List';

const limit = 10;

const MyPods = () => {
	const [page, setPage] = useState(1);
	const { rows, loading, total } = useGetDbRows('pod', {}, { page, limit });
	let allListed = rows.length >= total;

	return (
		<React.Fragment>
			<div className="title-card blue-title-card">
				<div className="title-cardHead-wrapper">
					<h4 className="title-cardHead">Pods ({total === null ? '...' : total})</h4>
				</div>
				<div className="title-cardDetails">
					<span className="title-checkbox-wrapper">
						<label className="checkbox-container white-checkbox">
							<input type="checkbox" />
							<span className="checkmark"></span> Owned by Me
						</label>
					</span>
					<span className="title-checkbox-wrapper">
						<label className="checkbox-container white-checkbox">
							<input type="checkbox" />
							<span className="checkmark"></span> Owned by Anyone
						</label>
					</span>
				</div>
			</div>
			<PodList loading={loading} rows={rows} />
			{!loading && !allListed && <Button onClick={() => setPage(page + 1)} label="LOAD MORE" />}
		</React.Fragment>
	);
};

export default (props) => (
	<LayoutMain>
		<MyPods {...props} />
	</LayoutMain>
);
