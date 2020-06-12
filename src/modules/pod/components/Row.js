import React from 'react';
import { useIsOwner } from 'hooks';
import { Button, LinkCustom, ConfirmationModal } from 'components/common';

export default ({ row, count }) => {
	const isOwner = useIsOwner(row.userId);
	const { _id } = row;
	return (
		<div className="pods-list-wrapper box-shadow">
			<div className="pod-number">
				<span className="number-btn green-btn">{count}</span>
			</div>
			<div className="pod-content">
				<h4 className="pod-list-head">{row.name}</h4>
				<p className="pod-paragraph">
					{row.description} - ${row.podKey}
				</p>
				<div className="pod-list-btns">
					<button className="btn small-btn blue-btn">
						<img src="/img/icons/user-group-icon.png" alt="" /> {row.members.length}
					</button>

					{isOwner ? (
						<React.Fragment>
							<LinkCustom to={`/pod/settings?id=${_id}`}>
								<button className="btn small-btn green-btn">Setings</button>
							</LinkCustom>
							<button className="btn small-btn red-btn">Delete</button>
						</React.Fragment>
					) : (
						<button className="btn small-btn btn-danger">Leave</button>
					)}
				</div>
			</div>
		</div>
	);
};
