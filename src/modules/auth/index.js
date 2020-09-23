import React, { useEffect, Fragment, useState } from 'react';
import { LayoutAuth } from 'layouts';
import { BASE_URL } from 'config';
import { LinkCustom } from 'components/common';
import LoginForm from './components/LoginForm';

const GOOGLE_AUTH_URL = `${BASE_URL}auth/google`;

function newTab() { 
	var popup=window.open(GOOGLE_AUTH_URL, 
	"", "width=500, height=400"); 
	setTimeout(function(){ 
		popup.close();
		window.location.reload();
	}, 6500);
}

export default () => (
	<LayoutAuth>
		<div className="login-form">
			<LoginForm />
		</div> 
		<div className="with-google">
			
			<button className="btn google-btn" onClick={newTab}>
			   
				<img src="/img/icons/google-icon.png" alt="" /> Sign In with Google
			</button>
			<h6 className="signup-link">
				Don't have an account? <LinkCustom to="/signup">Sign Up</LinkCustom>
			</h6>
		</div>
	</LayoutAuth>
);
