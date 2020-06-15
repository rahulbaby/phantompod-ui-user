import React, { Fragment, useState, useEffect } from 'react';
import { LayoutMain } from 'layouts';
import { Button } from 'components/common';
import { useGetDbRows, useRedux } from 'hooks';
import PodList from './components/List';
import { refreshRows } from './actions';

const limit = 100;

const MyPods = () => {
	const [page, setPage] = useState(1);
	const [asOwner, setAsOwner] = useState(true);
	const [asMemeber, setAsMemeber] = useState(true);
	const { dispatch, getReduxItem } = useRedux();
	const { rows: podRows, loading, total: podTotal } = useGetDbRows('pod', {}, { page, limit });

	useEffect(() => {
		dispatch(refreshRows(podRows, podTotal));
	}, [podRows, podTotal]);

	const { rows, total } = getReduxItem('pod');
	const { user } = getReduxItem('auth');
	let allListed = rows.length >= total;
	const rowsFiltered =
		asOwner && asMemeber
			? rows
			: rows.filter(
					(x) => (asOwner && x.userId === user._id) || (asMemeber && x.userId !== user._id),
			  );

	return (
		<React.Fragment>
			<div className="title-card blue-title-card">
				<div className="title-cardHead-wrapper">
					<h4 className="title-cardHead">Pods ({total === null ? '...' : total})</h4>
				</div>
				<div className="title-cardDetails">
					<span className="title-checkbox-wrapper">
						<label className="checkbox-container white-checkbox">
							<input type="checkbox" checked={asOwner} onChange={(e) => setAsOwner(!asOwner)} />
							<span className="checkmark"></span> Owned by Me
						</label>
					</span>
					<span className="title-checkbox-wrapper">
						<label className="checkbox-container white-checkbox">
							<input
								type="checkbox"
								checked={asMemeber}
								onChange={(e) => setAsMemeber(!asMemeber)}
							/>
							<span className="checkmark"></span> Owned by Anyone
						</label>
					</span>
				</div>
			</div>
			<PodList loading={loading} rows={rowsFiltered} />
			{!loading && !allListed && <Button onClick={() => setPage(page + 1)} label="LOAD MORE" />}
		</React.Fragment>
	);
};

export default (props) => (
	<LayoutMain>
		<MyPods {...props} />
	</LayoutMain>
);
