import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { LayoutPlain } from 'layouts';
import { LoaderCircular } from 'components/loaders';
import { useRedux, useRouter } from 'hooks';
import { emailVerify } from 'modules/auth/actions';
import { instance } from 'utils';

const useQuery = (name) => {
	let query = new URLSearchParams(useLocation().search);
	return query;
};

const txtArr = [
	'Authentication successful.',
	'Authentication successful. Now you can close this window and reload Phantompod.',
];

const NoticePgae = (props) => {
	let query = useQuery();
	return (
		<div className="signin-wrapper  ">
			<div className="login-wrap ">
				<div className="login-logo">
					<img src="/img/logo.png" alt="" />
				</div>
				<div className="alert m-4" role="alert">
					{txtArr[query.get('tmpl') || 1]}
				</div>
			</div>
		</div>
	);
};

export default NoticePgae;
