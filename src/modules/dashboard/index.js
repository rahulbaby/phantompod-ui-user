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
	<div className="progress">
		<div
			className="progress-bar"
			role="progressbar"
			aria-valuenow={value}
			aria-valuemin="0"
			aria-valuemax="100"
			style={{ width: `${value || 0}%` }}
		>
			{label}
		</div>
	</div>
);

const DashboardStati = () => (
	<div className="trending-graph-wrapper">
		<h3 className="graph-head">Trending Posts by Number of Likes</h3>
		<div className="graph-area">
			<div className="graph-progress">
				<ProgressBar label="New Boost" value={70} />
				<ProgressBar label="New Boost" value={70} />
				<ProgressBar label="New Boost" value={70} />
				<ProgressBar label="New Boost" value={70} />
			</div>
			<div className="graph-breakdowns">
				<div className="breakdown-single">
					<div className="breakdown-border"></div>
					<span>0</span>
				</div>
				<div className="breakdown-single">
					<div className="breakdown-border"></div>
					<span>100</span>
				</div>
				<div className="breakdown-single">
					<div className="breakdown-border"></div>
					<span>200</span>
				</div>
				<div className="breakdown-single">
					<div className="breakdown-border"></div>
					<span>300</span>
				</div>
				<div className="breakdown-single">
					<div className="breakdown-border"></div>
					<span>400</span>
				</div>
				<div className="breakdown-single">
					<div className="breakdown-border"></div>
					<span>500</span>
				</div>
			</div>
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
		<DashboardStati />
	</React.Fragment>
);

export default () => (
	<LayoutMain>
		<Dashboard />
	</LayoutMain>
);
