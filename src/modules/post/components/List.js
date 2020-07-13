import React, { Fragment } from 'react';
import { PostsStoreProvider, usePostsStore } from '../store';
import { EmptyNotice, Button, ConfirmButton } from 'components/common';

import { isoToFormatted } from 'utils/functions';
import { setPage } from '../actions';
import { useIsOwner, useApiHttpCall, useRedux, useShowMsg } from 'hooks';

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
			<div class="trash-icon">
				<a href="#" class="trash-btn">
					<img src="/img/icons/trash-icon.png" alt="" />
				</a>
			</div>
		</ConfirmButton>
	);
};

const PostRow = ({ row, count }) => {
	const isOwner = useIsOwner(row.userId._id);
	return (
		<div className="pods-list-wrapper box-shadow">
			<div className="pod-number">
				<span className="number-btn green-btn">{count}</span>
			</div>
			<div className="pod-content pod-details-content">
				<h4 className="pod-details-head">{row.name}</h4>
				<p className="pod-details-para">
					Added by {row.userId.name} on {isoToFormatted(row.createdAt, 'MMM DD, YYYY')}
				</p>
			</div>
			{isOwner && <PostDeleteButton id={row._id} />}
		</div>
	);
};

const PostList = (props) => {
	const { state, dispatch } = usePostsStore();
	const { rows, loading, total, page } = state;
	return (
		<Fragment>
			{!loading && rows.length === 0 && <EmptyNotice title="No posts avialable now." />}
			{rows.map((x, i) => (
				<PostRow count={i + 1} row={x} key={x._id.toString()} />
			))}
			{rows.length < total && !loading && (
				<Button label="load more" onClick={() => setPage(dispatch)(page + 1)} />
			)}
		</Fragment>
	);
};

export default ({ id }) => {
	return (
		<PostsStoreProvider id={id}>
			<PostList />
		</PostsStoreProvider>
	);
};
