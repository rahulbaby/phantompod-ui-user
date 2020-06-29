import React from 'react';
import { Button, LinkCustom, ConfirmButton } from 'components/common';
import { useDispatch } from 'react-redux';
import { useApiHttpCall, useShowMsg, useRedux } from 'hooks';
import { useMarketplaceStore } from '../store';

const RequestAccessButton = ({ id }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const [showMessage] = useShowMsg();
	const { dispatch } = useRedux();
	const { resetStore } = useMarketplaceStore();

	const handleClick = () => {
		triggerApiCall(
			'pod/alter-members',
			{ id },
			(res) => {
				const { error, message, record } = res;
				showMessage(message, error ? 'danger' : 'success');
				if (!error && record) resetStore();
			},
			'put',
			({ message }) => showMessage(message, 'danger'),
		);
	};
	return (
		<button onClick={handleClick} className="btn small-btn iris-blue-btn">
			Request Access
		</button>
	);
};

export default ({ row, count }) => {
	return (
		<div className="pods-list-wrapper box-shadow">
			<div className="pod-number">
				<span className="number-btn green-btn">{count}</span>
			</div>
			<div className="pod-content">
				<h4 className="pod-list-head">{row.name}</h4>
				<p className="pod-paragraph">{row.description}</p>
				<div className="pod-list-btns">
					<button className="btn small-btn blue-btn">
						<img src="img/icons/user-group-icon.png" alt="" /> {row.members.length}
					</button>
					<RequestAccessButton id={row.podKey} />
				</div>
			</div>
		</div>
	);
};
