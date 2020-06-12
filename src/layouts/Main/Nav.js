import React from 'react';
import { LinkCustom } from 'components/common';

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
		to: '/',
	},
	{
		icon: 'notification.svg',
		iconHover: 'notification-active.svg',
		to: '/',
	},
	{
		icon: 'settings.svg',
		iconHover: 'settings-active.svg',
		to: '/',
	},
	{
		icon: 'support.svg',
		iconHover: 'support-active.svg',
		to: '/',
	},
];

export default () => (
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
							<img className="menu-icon" src={`/img/icons/${x.icon}`} alt="" />
							<img className="menu-icon-hover" src={`/img/icons/${x.iconHover}`} alt="" />
						</LinkCustom>
					</li>
				))}
			</ul>
		</div>
	</nav>
);
