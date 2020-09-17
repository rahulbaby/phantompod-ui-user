import React from 'react';
import { LayoutMain } from 'layouts';
import { instance } from 'utils';

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

const DashboardStati = () => {
	const [loading, setLoading] = React.useState(false);
	const [result, setresult] = React.useState([]);
	const getRows = () => {
		setLoading(true);
		instance.get('user/dashboard-posts').then((res) => {
			setLoading(false);
			setresult(res.posts);
		});
	};
	React.useEffect(() => {
		getRows();
	}, []);
	if (loading || !result.length) return null;

	const maxValueOfX = Math.max(...result.map((o) => o.postLikes || 0), 0);

	console.log('highestPostLikeCount', maxValueOfX, result);
	const xAxisDiv = maxValueOfX / 5;

	return (
		<div className="trending-graph-wrapper">
			<h3 className="graph-head">Trending Posts by Number of Likes</h3>
			<div className="graph-area">
				<div className="graph-progress">
					{result.map((x) => (
						<ProgressBar label={x.name} value={x.postLikes} />
					))}
				</div>
				<div className="graph-breakdowns">
					<div className="breakdown-single">
						<div className="breakdown-border"></div>
						<span>0</span>
					</div>
					<div className="breakdown-single">
						<div className="breakdown-border"></div>
						<span>{parseInt(xAxisDiv * 1)}</span>
					</div>
					<div className="breakdown-single">
						<div className="breakdown-border"></div>
						<span>{parseInt(xAxisDiv * 2)}</span>
					</div>
					<div className="breakdown-single">
						<div className="breakdown-border"></div>
						<span>{parseInt(xAxisDiv * 3)}</span>
					</div>
					<div className="breakdown-single">
						<div className="breakdown-border"></div>
						<span>{parseInt(xAxisDiv * 4)}</span>
					</div>
					<div className="breakdown-single">
						<div className="breakdown-border"></div>
						<span>{xAxisDiv * 5}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const DashboardCards = () => {
	const [loading, setLoading] = React.useState(false);
	const [result, setresult] = React.useState({
		podsOwn: '--',
		podsImIn: '--',
		profileViews: '--',
		postLikes: '--',
	});
	const getRows = () => {
		setLoading(true);
		instance.get('user/dashboard').then((res) => {
			setLoading(false);
			setresult(res);
		});
	};
	React.useEffect(() => {
		getRows();
	}, []);
	const { podsOwn, podsImIn, profileViews, postLikes } = result;
	return (
		<div className="dashboard-cards-wrapper">
			<SectionCard title={podsOwn} subtitle="Pods I own" color="iris-blue-card" />
			<SectionCard title={podsImIn} subtitle="Pods I am In" color="marguerite-blue-card" />
			<SectionCard title={postLikes} subtitle="Post Likes" color="violet-blue-card" />
			<SectionCard title={profileViews} subtitle="Profile Views" color="navy-blue-card" />
		</div>
	);
};

const Dashboard = () => (
	<React.Fragment>
		<DashboardCards />
		<DashboardStati />
	</React.Fragment>
);

export default () => (
	<LayoutMain>
		<Dashboard />
	</LayoutMain>
);
