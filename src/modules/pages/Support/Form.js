import React from 'react';

export default () => (
	<div className="contact-form-wrapper">
		<h3 className="contact-form-head">Submit a Support Request</h3>
		<div className="contact-form">
			<div className="form-group">
				<input type="text" className="form-control form-input" placeholder="Subject" />
			</div>
			<div className="form-group">
				<textarea
					name=""
					className="form-control"
					id=""
					cols="30"
					rows="10"
					placeholder="Request Details*"
				></textarea>
			</div>
			<div className="right-btns-wrapper">
				<button className="btn small-btn red-btn">Cancel</button>
				<button className="btn small-btn green-btn">Submit</button>
			</div>
		</div>
	</div>
);
