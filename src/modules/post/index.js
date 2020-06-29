import React, { useState } from 'react';
import { LayoutMain } from 'layouts';
import { LinkCustom } from 'components/common';
import { useRouter } from 'hooks';
import PostForm from './components/Form';
import PostList from './components/List';
import {
	usePostsStore,
	usePodDetailsStore,
	PodDetailsStoreProvider,
	PostsStoreProvider,
} from './store';

const TitleCard = ({ row }) => {
	const { history } = useRouter();
	return (
		<div className="title-card">
			<div className="title-cardHead-wrapper">
				<h4 className="title-cardHead">{row.name}</h4>
			</div>
			<div className="title-cardDetails">
				<button onClick={history.goBack} className="btn medium-btn blue-btn">
					Back
				</button>
				<LinkCustom to={`/pod/settings?id=${row._id}`}>
					<img src="/img/icons/settings.png" style={{ margin: '0 0 0 12px' }} alt="" />
				</LinkCustom>
			</div>
		</div>
	);
};

const PostAddFormPre = ({ onSucccess }) => {
	const [url, setUrl] = useState('');
	const handleSubmit = () => {
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
				<button className="btn green-btn search-btn" type="submit" onClick={handleSubmit}>
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
			<PostList id={row._id} />
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
