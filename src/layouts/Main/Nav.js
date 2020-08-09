import React from 'react';
import { LinkCustom } from 'components/common';
import { imgSrc } from 'utils/functions';
import { useRedux, useRouter } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRows } from 'modules/notification/actions';

const items = [
	{
		icon: 'dashboard.svg',
		iconHover: 'dashboard-active.svg',
		to: '/dashboard',
	},
	{
		icon: 'my-pods.svg',
		iconHover: 'my-pods-active.svg',
		to: '/pod/list',
	},
	{
		icon: 'marketplace.svg',
		iconHover: 'marketplace-active.svg',
		to: '/marketplace',
	},
	{
		icon: 'notification.svg',
		iconHover: 'notification-active.svg',
		to: '/notifications',
	},
	{
		icon: 'settings.svg',
		iconHover: 'settings-active.svg',
		to: '/settings',
	},
	{
		icon: 'support.svg',
		iconHover: 'support-active.svg',
		to: '/support',
	},
];

export default () => {
	const { getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const userData = authData.user;
	const dispatch = useDispatch();
	const notificationCount = useSelector(({ notification }) => notification.unreadTotal);
	React.useEffect(() => {
		dispatch(fetchRows());
	}, []);

	if (notificationCount) items[3].badge = notificationCount;

	return (
		<nav>
			<div className="nav-left">
				<div className="logo">
					<a href="#">
						<img src="/img/logo.png" className="logo-img" />
					</a>
				</div>
				<ul className="menulist">
					{items.map((x, i) => (
						<li key={i.toString()}>
							<LinkCustom to={x.to} classNameActive="active">
								{x.badge && <span class="notification-count">{x.badge}</span>}
								<img className="menu-icon" src={`/img/icons/${x.icon}`} alt="" />
								<img className="menu-icon-hover" src={`/img/icons/${x.iconHover}`} alt="" />
							</LinkCustom>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};
