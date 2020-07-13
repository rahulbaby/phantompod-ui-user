import React, { useEffect, Fragment, useState } from 'react';
import { LayoutAuth } from 'layouts';
import { BASE_URL } from 'config';
import { LinkCustom } from 'components/common';
import LoginForm from './components/LoginForm';

const GOOGLE_AUTH_URL = `${BASE_URL}auth/google`;

export default () => (
	<LayoutAuth>
		<div className="login-form">
			<LoginForm />
		</div>
		<div className="with-google">
			<button className="btn google-btn" onClick={() => (window.location = GOOGLE_AUTH_URL)}>
				<img src="/img/icons/google-icon.png" alt="" /> Sign In with Google
			</button>
			<h6 className="signup-link">
				Don't have an account? <LinkCustom to="/signup">Sign Up</LinkCustom>
			</h6>
		</div>
	</LayoutAuth>
);
