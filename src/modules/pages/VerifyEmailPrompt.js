import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LayoutMain } from 'layouts';
import { ErrorNotice } from 'components/common';
import { useRedux, useRouter } from 'hooks';

export default () => {
	const auth = useSelector(({ auth }) => auth);
	const { history, query } = useRouter();
	const { isLoading, authenticated, error, lastFetchValid } = auth;
	const emailVerified = authenticated ? auth.user.emailVerified : false;

	useEffect(() => {
		if (emailVerified) history.replace('/');
	}, [emailVerified]);

	return (
		<LayoutMain>
			<ErrorNotice
				title={'Please verify your email!'}
				subTitle={`Please find the verification link from your registered email ID`}
			/>
		</LayoutMain>
	);
};
