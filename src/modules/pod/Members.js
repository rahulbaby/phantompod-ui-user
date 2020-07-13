import React, { Fragment, useEffect, useState } from 'react';
import { LayoutMain } from 'layouts';

import { PodContextProvider, useStateContext } from './context';
import {
	useGetDbRow,
	useQuery,
	useIsOwner,
	useUserId,
	useApiHttpCall,
	useShowMsg,
	useRouter,
} from 'hooks';
import { ErrorNotice, EmptyNotice, Button, LinkCustom } from 'components/common';
import { LoaderList } from 'components/loaders';
import { isoToFormatted } from 'utils/functions';
import PodRow from './components/Row';

const PodAccessButton = ({ row, memberId, status, podId, ...rest }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const [showMessage] = useShowMsg();
	const [{}, dispatch] = useStateContext();
	return (
		<Button
			onClick={() =>
				triggerApiCall(
					'pod/alter-member-access',
					{ _id: row._id, podId, memberId: row.userId, status },
					({ record }) => {
						showMessage(status, 'success');
						dispatch({
							type: 'UPDATE_ROW',
							payload: { row: record, loading: false },
						});
					},
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

const PodRemoveButton = ({ row, memberId, status, podId, ...rest }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const [showMessage] = useShowMsg();
	const [{}, dispatch] = useStateContext();
	return (
		<Button
			onClick={() =>
				triggerApiCall(
					'pod/remove-member',
					{ _id: row._id, podId, memberId: row.userId, status },
					({ record }) => {
						showMessage('Removed from list!', 'success');
						dispatch({
							type: 'UPDATE_ROW',
							payload: { row: record, loading: false },
						});
					},
					'put',
				)
			}
			label="Reject"
			className="btn small-btn red-btn"
			loading={loading}
			{...rest}
		/>
	);
};

const Row = ({ row, isOwner, podId }) => {
	const requested = row.status === 'requested';
	const banned = row.status === 'banned';
	const accepted = row.status === 'accepted';
	const userId = useUserId();

	const buttonProps = { row, podId };

	return (
		<div className="member-wrapper">
			<div className="member-img">
				<img src="/img/user-img.jpg" alt="" />
			</div>
			<div className="member-content">
				<h5 className="member-name">{row.name}</h5>
				<p className="member-discription">
					{requested ? 'Requested' : banned ? 'banned' : 'Joined'} on{' '}
					{isoToFormatted(row.updatedAt, 'MMM DD, YYYY')}
				</p>
			</div>
			<div style={{ display: 'inline-flex', alignItems: 'center', padding: '0 20px 0 15px' }}>
				{isOwner && row.userId !== userId && (
					<React.Fragment>
						{(!accepted || requested) && (
							<PodAccessButton
								{...buttonProps}
								status="accepted"
								label="ACCEPT"
								className="btn small-btn btn-success mr-2"
							/>
						)}
						{requested && (
							<PodRemoveButton
								{...buttonProps}
								status="banned"
								label="REJECT"
								className="btn small-btn btn-danger mr-2"
							/>
						)}
						{accepted && (
							<PodAccessButton
								{...buttonProps}
								status="banned"
								label="BAN USER"
								className="btn small-btn btn-danger mr-2"
							/>
						)}
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

const PodMembers = () => {
	const { id } = useQuery();
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState('accepted');
	const { history } = useRouter();
	const { loading: podLoading, row: podRow } = useGetDbRow('pod', { _id: id });
	const [{ row, loading }, dispatch] = useStateContext();
	const isOwner = useIsOwner(row ? row.userId : null);

	useEffect(() => {
		dispatch({
			type: 'UPDATE_ROW',
			payload: { row: podRow, loading: podLoading },
		});
	}, [podRow, podLoading]);

	if (id && loading) return <LoaderList />;
	if (!row) return <ErrorNotice />;

	let members = row.members.filter((x) => search == '' || x.name.indexOf(search) > -1);
	if (!isOwner) members = members.filter((x) => x.status === 'accepted');

	const statusArr = {
		accepted: 'ACCEPTED',
		requested: 'REQUESTED',
		banned: 'BANNED',
	};
	const listByStatus = {};
	Object.keys(statusArr).map((x) => {
		listByStatus[x] = members.filter((xm) => xm.status === x);
	});
	const membersSelected = listByStatus[status];

	return (
		<React.Fragment>
			{false && <PodRow row={row} count={1} />}
			<div className="title-card mt-4">
				<div className="title-cardHead-wrapper">
					<h4 className="title-cardHead">Pod Members ({members.length})</h4>
				</div>
				<div className="title-cardDetails">
					<button onClick={history.goBack} className="btn medium-btn blue-btn">
						Back
					</button>
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
			<ul className={`nav nav-tabs ${isOwner ? '' : 'd-none'}`}>
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

export default () => (
	<LayoutMain>
		<PodContextProvider>
			<PodMembers />
		</PodContextProvider>
	</LayoutMain>
);
