import React from 'react';
import { LayoutMain } from 'layouts';

const SectionCard = ({ title, subtitle, help, color }) => (
	<div className={`card ${color || 'iris-blue-card'}`}>
		{help && (
			<span className="help-icon">
				<img src="img/help.png" alt="" />
			</span>
		)}
		<h3 className="card-head">{title}</h3>
		<p className="card-discription">{subtitle}</p>
	</div>
);

const ProgressBar = ({ value, label }) => (
	<div className="progress mb-4" style={{ height: 30 }}>
		<div
			className="progress-bar "
			role="progressbar"
			style={{ with: `${value || 0}%` }}
			aria-valuenow={value || 0}
			aria-valuemin="0"
			aria-valuemax={100}
		>
			{label}
		</div>
	</div>
);

const Dashboard = () => (
	<React.Fragment>
		<div className="dashboard-cards-wrapper">
			<SectionCard title="25" subtitle="Pods I am In" color="iris-blue-card" />
			<SectionCard title="12" subtitle="Pods I am In" color="marguerite-blue-card" />
			<SectionCard title="4185" subtitle="Pod | Manage" color="violet-blue-card" />
			<SectionCard title="85,439" subtitle="Post Likes" color="navy-blue-card" />
		</div>
		<div className="trending-graph-wrapper">
			<h6>Trending posts by number oflikes</h6>

			<ProgressBar label="New Boost" value={70} />
			<ProgressBar label="Stay Haungry , stay foolish" value={460} />
			<ProgressBar label="h6. Bootstrap heading" value={420} />
		</div>
	</React.Fragment>
);

export default () => (
	<LayoutMain>
		<Dashboard />
	</LayoutMain>
);
