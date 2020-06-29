import React from 'react';
import { useIsOwner, useApiHttpCall, useRedux, useShowMsg } from 'hooks';
import { Button, LinkCustom, ConfirmButton } from 'components/common';
import { confirmAlert } from 'utils';
import { removeRow } from '../actions';

const PodLeaveButton = ({ id, podKey }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const { dispatch } = useRedux();
	const [showMessage] = useShowMsg();
	return (
		<ConfirmButton
			label="Leave"
			message="You are about to leave this pod."
			onConfirm={() => {
				dispatch(removeRow(id));
				triggerApiCall(
					'pod/alter-members',
					{ id: podKey, remove: 1 },
					({ error, message }) => showMessage(message, error ? 'danger' : 'success'),
					'put',
				);
			}}
			loading={loading}
		/>
	);
};

const PodDeleteButton = ({ id }) => {
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const { dispatch } = useRedux();
	const [showMessage] = useShowMsg();
	return (
		<ConfirmButton
			label="Delete"
			message="Pod will be removed from the list."
			onConfirm={() => {
				dispatch(removeRow(id));
				triggerApiCall(
					'pod',
					{ id },
					({ error, message }) => showMessage(message, error ? 'danger' : 'success'),
					'delete',
				);
			}}
			className="btn small-btn red-btn"
			loading={loading}
		/>
	);
};

export default ({ row, count }) => {
	const isOwner = useIsOwner(row.userId);
	const { _id, podKey } = row;
	const members = row.members.filter((x) =>
		isOwner ? x.status !== 'rejected' : x.status === 'accepeted',
	);
	return (
		<div className="pods-list-wrapper box-shadow">
			<div className="pod-number">
				<span className="number-btn green-btn">{count}</span>
			</div>
			<div className="pod-content">
				<LinkCustom to={`/marketplace/${_id}`}>
					<h4 className="pod-list-head">{row.name}</h4>
				</LinkCustom>
				<p className="pod-paragraph">
					{row.description} - ${row.podKey}
				</p>
				<div className="pod-list-btns">
					<LinkCustom to={`/pod/members?id=${_id}`}>
						<button className="btn small-btn blue-btn">
							<img src="/img/icons/user-group-icon.png" alt="" /> {members.length}
						</button>
					</LinkCustom>

					{isOwner ? (
						<React.Fragment>
							<LinkCustom to={`/pod/settings?id=${_id}`}>
								<button className="btn small-btn green-btn">Setings</button>
							</LinkCustom>
							<PodDeleteButton id={_id} />
						</React.Fragment>
					) : (
						<PodLeaveButton podKey={podKey} id={_id} />
					)}
				</div>
			</div>
		</div>
	);
};
