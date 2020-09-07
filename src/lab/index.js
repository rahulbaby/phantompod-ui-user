import React from 'react';
import Cookies from 'universal-cookie';
import { AUTH_TOKEN_KEY } from 'config';
const cookies = new Cookies();
const cookieOptions = {
	path: '/',
	//secure: true,
	session: false,
	hostOnly: false,
	//httpOnly: true,
	sameSite: true,
};

export default () => null;
