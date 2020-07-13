import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LayoutPlain } from 'layouts';
import { LoaderCircular } from 'components/loaders';
import { useRedux, useRouter } from 'hooks';
import { emailVerify } from 'modules/auth/actions';
import { instance } from 'utils';

const VerificationResult = ({ verified }) => {
	return verified ? (
		<div class="alert alert-success" role="alert">
			Email verified successfully!
		</div>
	) : (
		<div class="alert alert-danger" role="alert">
			Sorry ! Can't varify email now.
		</div>
	);
};

export default () => {
	const { dispatch } = useRedux();
	const { history, query } = useRouter();
	const [verified, setVerified] = useState(null);

	const auth = useSelector(({ auth }) => auth);
	const { isLoading, authenticated, error, lastFetchValid } = auth;
	const emailVerified = authenticated ? auth.user.emailVerified : false;

	useEffect(() => {
		if (emailVerified) history.replace('/');
	}, [emailVerified]);

	useEffect(() => {
		//API call
		instance.post('verify-email', query).then((res) => {
			console.log('res data:', res);
			setVerified(res.verified || false);
		});
	}, []);

	return (
		<LayoutPlain>
			{verified === null ? <LoaderCircular /> : <VerificationResult verified={verified} />}
		</LayoutPlain>
	);
};
