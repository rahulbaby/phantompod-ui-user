import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutMain } from 'layouts';
import { isoToFormatted } from 'utils/functions';
import { instance } from 'utils';
import { useRouter, useRedux } from 'hooks';
import { fetchRows } from './actions';
import { showMessage } from 'store/messages/actions';

const ReadAllButton = ({ onSuccess }) => {
	const [loading, setLoading] = React.useState(false);
	const { dispatch, getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const user = authData.user;

	const handleClick = () => {
		setLoading(true);
		instance.get('notification/read-all').then((res) => {
			dispatch(showMessage('Success', 'success'));
			onSuccess && onSuccess();
			setLoading(false);
			setTimeout(() => {
				window.location.reload();
			}, 200);
		});
	};

	return (
		<React.Fragment>
			<button className="btn medium-btn blue-btn" onClick={handleClick} disabled={loading}>
				{loading ? 'Processing..' : 'Mark all as read'}
			</button>
		</React.Fragment>
	);
};

const Row = ({ row }) => {
	const { history } = useRouter();
	return (
		<div
			className={`notification-wrapper ${row.seen ? '' : 'notification-on'}`}
			onClick={() => {
				instance.get(`/notification/read/${row._id}`);
				history.push(row.meta.url ? row.meta.url : `/pod/members?id=${row.meta.id}`);
			}}
			style={{ cursor: 'pointer' }}
		>
			<div className="notification-bell-wrapper">
				<span className="notification-bell">
					<img src="/img/icons/notification-bell.svg" alt="" />
				</span>
			</div>
			<div className="notification-content">
				<p dangerouslySetInnerHTML={{ __html: row.label }} />
			</div>
			<div className="notification-date">{isoToFormatted(row.createdAt, 'MMM DD, YYYY')}</div>
		</div>
	);
};
const NotificationPage = () => {
	const dispatch = useDispatch();
	const rows = useSelector(({ notification }) => notification.rows);
	React.useEffect(() => {
		dispatch(fetchRows());
	}, []);

	return (
		<React.Fragment>
			<div className="title-card">
				<div className="title-cardHead-wrapper">
					<h4 className="title-cardHead">
						{rows.filter((x) => !x.seen).length} Unread Notifications
					</h4>
				</div>
				<div className="title-cardDetails">
					<ReadAllButton onSuccess={() => dispatch(fetchRows())} />
				</div>
			</div>
			{rows.map((x) => (
				<Row key={x._id.toString()} row={x} />
			))}
		</React.Fragment>
	);
};

export default (props) => (
	<LayoutMain>
		<NotificationPage {...props} />
	</LayoutMain>
);
