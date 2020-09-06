import React, { useState } from 'react';
import { LayoutMain } from 'layouts';
import { LinkCustom, ConfirmButton } from 'components/common';
import { useRouter, useRedux, useApiHttpCall, useShowMsg, useIsOwner } from 'hooks';
import PostForm from './components/Form';
import PostList from './components/List';
import {
	usePostsStore,
	usePodDetailsStore,
	PodDetailsStoreProvider,
	PostsStoreProvider,
} from './store';
import { isLinkedInUrl } from 'utils/functions';
import { showMessage } from 'store/messages/actions';

const PodLeaveButton = ({ id, podKey, isOwner }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const { dispatch } = useRedux();
	const [showMessage] = useShowMsg();
	const { history } = useRouter();

	return (
		<ConfirmButton
			label="Leave"
			message="You are about to leave this pod."
			onConfirm={() => {
				triggerApiCall(
					'pod/alter-members',
					{ id: podKey, remove: 1 },
					({ error, message }) => {
						showMessage(message, error ? 'danger' : 'success');
						history.replace('/pod/list');
					},
					'put',
				);
			}}
			loading={loading}
		>
			<a style={{ cursor: 'pointer' }}>Leave Pod</a>
		</ConfirmButton>
	);
};

const PodDeleteButton = ({ id }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const { dispatch } = useRedux();
	const [showMessage] = useShowMsg();
	const { history } = useRouter();

	return (
		<ConfirmButton
			label="Delete"
			message="Pod will deleted."
			onConfirm={() => {
				triggerApiCall(
					'pod',
					{ id },
					({ error, message }) => {
						showMessage(message, error ? 'danger' : 'success');
						history.replace('/pod/list');
					},
					'delete',
				);
			}}
			loading={loading}
		>
			<a style={{ cursor: 'pointer' }}>Delete Pod</a>
		</ConfirmButton>
	);
};

const TitleCard = ({ row }) => {
	const { history } = useRouter();
	const isOwner = useIsOwner(row.userId);
	return (
		<div className="title-card">
			<div className="title-cardHead-wrapper">
				<h4 className="title-cardHead">{row.name}</h4>
			</div>
			<div className="title-cardDetails">
				<button onClick={history.goBack} className="btn medium-btn blue-btn">
					Back
				</button>
				<div class="settings-dropdown-icon">
					<img src="/img/icons/settings.png" style={{ margin: '0 0 0 12px' }} alt="" />
					<div class="settings-dropdown-wrapper">
						<ul class="settings-dropdown">
							<li style={{ color: '#000' }}>
								<LinkCustom style={{ color: '#000' }} to={`/pod/members?id=${row._id}`}>
									Members
								</LinkCustom>
							</li>
							{isOwner && (
								<li>
									<LinkCustom style={{ color: '#000' }} to={`/pod/settings?id=${row._id}`}>
										Settings
									</LinkCustom>
								</li>
							)}
							<li style={{ color: '#000' }}>
								{isOwner ? (
									<PodDeleteButton id={row._id} podKey={row.podKey} />
								) : (
									<PodLeaveButton id={row._id} podKey={row.podKey} />
								)}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

const PostAddFormPre = ({ onSucccess }) => {
	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState('');
	const { dispatch, getReduxItem } = useRedux();
	const handleSubmit = () => {
		setLoading(true);
		if (!isLinkedInUrl(url)) {
			dispatch(showMessage('Please enter a valid url!'));
			setTimeout(() => setLoading(false), 1000);
			return;
		}
		onSucccess(url);
	};
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<div className="search-from mb-4">
				<input
					type="text"
					className="form-control form-input"
					placeholder="LinkedIn Post URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<button
					className="btn green-btn search-btn"
					type="submit"
					onClick={handleSubmit}
					disabled={loading}
				>
					Add Post
				</button>
			</div>
		</form>
	);
};

const PodPostsPage = (props) => {
	const [row, loading] = usePodDetailsStore();
	const [url, setUrl] = useState('');

	if (url) return <PostForm url={url} row={row} onSuccess={() => setUrl('')} />;

	return (
		<React.Fragment>
			<TitleCard row={row} />
			<PostAddFormPre
				onSucccess={(url) => {
					setUrl(url);
				}}
			/>
			<PostList id={row._id} row={row} />
		</React.Fragment>
	);
};

export default () => {
	const { query } = useRouter();
	return (
		<LayoutMain>
			<PodDetailsStoreProvider id={query._id}>
				<PodPostsPage />
			</PodDetailsStoreProvider>
		</LayoutMain>
	);
};
