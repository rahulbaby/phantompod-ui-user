import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutMain } from 'layouts';
import { isoToFormatted } from 'utils/functions';
import { instance } from 'utils';
import { useRouter } from 'hooks';
import { fetchRows } from './actions';

const Row = ({ row }) => {
	const { history } = useRouter();
	return (
		<div
			className={`notification-wrapper ${row.seen ? '' : 'notification-on'}`}
			onClick={() => {
				instance.get(`/notification/read/${row._id}`);
				history.push(`/pod/members?id=${row.meta.id}`);
			}}
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
					<button className="btn medium-btn blue-btn">Mark all as read</button>
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
