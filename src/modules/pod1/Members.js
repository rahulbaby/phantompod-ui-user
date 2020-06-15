import React, { useState, useEffect } from 'react';
import { LayoutMain } from 'layouts';

import { LoaderList } from 'components/loaders';
import { useGetDbRow, useQuery, useIsOwner, useApiHttpCall, useShowMsg } from 'hooks';
import { isoToFormatted } from 'utils/functions';
import { ErrorNotice, EmptyNotice, Button, LinkCustom } from 'components/common';
import PodForm from './components/Form';
import PodRow from './components/Row';

const PodAccessButton = ({ row, memberId, status, podId, ...rest }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const [showMessage] = useShowMsg();
	return (
		<Button
			onClick={() =>
				triggerApiCall(
					'pod/alter-member-access',
					{ _id: row._id, podId, memberId: row.userId, status },
					() => showMessage(status, 'success'),
					'put',
				)
			}
			label="Change Sataus"
			className="btn small-btn red-btn"
			loading={loading}
			{...rest}
		/>
	);
};

const Row = ({ row, isOwner, podId }) => {
	const requested = row.status === 'requested';
	const rejected = row.status === 'rejected';
	const accepted = row.status === 'accepted';

	const buttonProps = { row, podId };

	return (
		<div className="member-wrapper">
			<div className="member-img">
				<img src="/img/user-img.jpg" alt="" />
			</div>
			<div className="member-content">
				<h5 className="member-name">{row.name}</h5>
				<p className="member-discription">
					{requested ? 'Requested' : rejected ? 'Rejected' : 'Joined'} on{' '}
					{isoToFormatted(row.updatedAt, 'MMM DD, YYYY')}
				</p>
				{(!accepted || requested) && (
					<PodAccessButton
						{...buttonProps}
						status="accepted"
						label="ACCEPT"
						className="btn small-btn btn-success"
					/>
				)}
				{(!rejected || requested) && (
					<PodAccessButton
						{...buttonProps}
						status="rejected"
						label="REJECT"
						className="btn small-btn btn-danger"
					/>
				)}
			</div>
		</div>
	);
};

const PodMemebers = () => {
	const { id } = useQuery();
	const { loading, row } = useGetDbRow('pod', { _id: id });
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState('requested');
	const isOwner = useIsOwner(row ? row.userId : null);

	if (id && loading) return <LoaderList />;
	if (!row) return <ErrorNotice />;
	const members = row.members.filter((x) => search == '' || x.name.indexOf(search) > -1);

	const statusArr = {
		requested: 'REQUESTED',
		accepted: 'ACCEPTED',
		rejected: 'REJECTED',
	};
	const listByStatus = {};
	Object.keys(statusArr).map((x) => {
		listByStatus[x] = members.filter((xm) => xm.status === x);
	});
	const membersSelected = listByStatus[status];

	return (
		<React.Fragment>
			<PodRow row={row} count={1} />
			<div className="title-card mt-4">
				<div className="title-cardHead-wrapper">
					<h4 className="title-cardHead">Pod Members ({members.length})</h4>
				</div>
				<div className="title-cardDetails">
					<LinkCustom to="/pod/list">
						<button className="btn medium-btn blue-btn">Back</button>
					</LinkCustom>
				</div>
			</div>
			<div className="search-from mb-4">
				<input
					value={search}
					className="form-control form-input"
					placeholder="Search by name"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button className="btn green-btn search-btn">Search</button>
			</div>
			<ul className="nav nav-tabs">
				{Object.keys(statusArr).map((x) => (
					<li className={`nav-item ${x === status ? 'active' : ''}`} key={x}>
						<a
							className={`nav-link ${x === status ? 'active' : ''}`}
							href="#"
							onClick={(e) => {
								e.preventDefault();
								setStatus(x);
							}}
						>
							{statusArr[x]} - ({listByStatus[x].length})
						</a>
					</li>
				))}
			</ul>
			<div className="tab-content pt-2">
				{membersSelected.map((x) => (
					<Row key={x._id} row={x} podId={row._id} isOwner={isOwner} />
				))}
				{!membersSelected.length && <EmptyNotice />}
			</div>
		</React.Fragment>
	);
};

export default (props) => (
	<LayoutMain>
		<PodMemebers {...props} />
	</LayoutMain>
);
