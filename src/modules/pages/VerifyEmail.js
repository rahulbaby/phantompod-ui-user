import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LayoutPlain } from 'layouts';
import { LoaderCircular } from 'components/loaders';
import { useRedux, useRouter } from 'hooks';
import { emailVerify } from 'modules/auth/actions';
import { instance } from 'utils';

const VerificationResult = ({ verified }) => {
	return verified ? (
		<div className="alert alert-success m-4" role="alert">
			Email verified successfully!
		</div>
	) : (
		<div className="alert alert-danger m-4" role="alert">
			Sorry ! Can't varify email now.
		</div>
	);
};

export default () => {
	const { dispatch } = useRedux();
	const { history, query } = useRouter();
	const [verified, setVerified] = useState(null);

	useEffect(() => {
		if (verified) history.replace('/login');
	}, [verified]);

	useEffect(() => {
		instance.post('verify-email', query).then((res) => {
			setVerified(res.verified || false);
		});
	}, []);

	return (
		<LayoutPlain>
			{verified === null ? <LoaderCircular /> : <VerificationResult verified={verified} />}
		</LayoutPlain>
	);
};
