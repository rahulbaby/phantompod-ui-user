import React from 'react';

const UserPasswordChangeForm = ({ setShowPasswordForm }) => (
	<div className="change-password-wrapper">
		<div className="change-password box-shadow">
			<h4 className="change-password-head">Change password</h4>
			<form action="">
				<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label className="form-label">Old password</label>
							<input type="text" className="form-control  form-Input" />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="form-label">New password</label>
							<input type="text" className="form-control  form-Input" />
						</div>
					</div>
				</div>
				<div className="right-btns-wrapper">
					<button
						type="button"
						className="btn small-btn red-btn"
						onClick={() => setShowPasswordForm(false)}
					>
						Cancel
					</button>
					<button className="btn small-btn green-btn">Change</button>
				</div>
			</form>
		</div>
	</div>
);

export default UserPasswordChangeForm;
