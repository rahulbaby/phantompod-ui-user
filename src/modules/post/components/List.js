import React, { Fragment } from 'react';
import { PostsStoreProvider, usePostsStore } from '../store';
import { EmptyNotice, Button, ConfirmButton } from 'components/common';

import { isoToFormatted } from 'utils/functions';
import { setPage } from '../actions';
import { useIsOwner, useApiHttpCall, useRedux, useShowMsg } from 'hooks';

const PostAcceptButton = ({ id }) => {
	const { resetStore } = usePostsStore();
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const [showMessage] = useShowMsg();
	return (
		<Button
			onClick={() =>
				triggerApiCall(
					'post/approve',
					{ id },
					({ record }) => {
						showMessage('Success', 'success');
						resetStore();
					},
					'put',
					({ message }) => showMessage(message || 'Something went wrong!', 'danger'),
				)
			}
			label="Approve"
			className="btn small-btn btn-success"
			loading={loading}
		/>
	);
};

const PostDeleteButton = ({ id }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const { dispatch } = useRedux();
	const [showMessage] = useShowMsg();
	const { resetStore } = usePostsStore();
	return (
		<ConfirmButton
			label="Delete"
			message="Pod will be removed from the list."
			onConfirm={() => {
				triggerApiCall(
					'post',
					{ id },
					({ error, message }) => {
						showMessage(message, error ? 'danger' : 'success');
						resetStore();
					},
					'delete',
				);
			}}
		>
			<div className="trash-icon">
				<a href="#" className="trash-btn">
					<img src="/img/icons/trash-icon.png" alt="" />
				</a>
			</div>
		</ConfirmButton>
	);
};

const PostRow = ({ row, count, isPodOwner }) => {
	const isOwner = useIsOwner(row.userId._id);
	return (
		<div className="pods-list-wrapper box-shadow">
			<div className="pod-number">
				<span className="number-btn green-btn">{count}</span>
			</div>
			<div className="pod-content pod-details-content">
				<a className="pod-details-head" href={row.url} target="_blank">
					{row.name}
				</a>
				<p className="pod-details-para">
					Added by {row.userId.name} on {isoToFormatted(row.createdAt, 'MMM DD, YYYY')}
				</p>
			</div>
			{isOwner && <PostDeleteButton id={row._id} />}
			{isPodOwner && !row.approved && (
				<div style={{ alignSelf: 'center' }}>
					<PostAcceptButton id={row._id} />
					<PostDeleteButton id={row._id} />
				</div>
			)}
		</div>
	);
};

const PostList = (props) => {
	const { state, dispatch } = usePostsStore();
	const { rows, loading, total, page } = state;
	const isPodOwner = useIsOwner(props.row.userId);
	return (
		<Fragment>
			{!loading && rows.length === 0 && <EmptyNotice title="No posts avialable now." />}
			{rows.map((x, i) => (
				<PostRow count={i + 1} row={x} key={x._id.toString()} isPodOwner={isPodOwner} />
			))}
			{rows.length < total && !loading && (
				<Button label="load more" onClick={() => setPage(dispatch)(page + 1, props.id)} />
			)}
		</Fragment>
	);
};

export default ({ id, row }) => {
	return (
		<PostsStoreProvider id={id}>
			<PostList id={id} row={row} />
		</PostsStoreProvider>
	);
};
