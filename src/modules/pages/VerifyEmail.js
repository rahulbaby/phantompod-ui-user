import React, { useEffect, Fragment, useState } from 'react';
import { LayoutPlain } from 'layouts';
import { LoaderCircular } from 'components/loaders';
import { useRedux, useRouter } from 'hooks';
import { emailVerify } from 'modules/auth/actions';
import { instance } from 'utils';

export default () => {
	const { dispatch } = useRedux();
	const { history, query } = useRouter();
	useEffect(() => {
		//API call
		instance.post('user/verifyUser',query).then((res) => {
			console.log('res data:',res);
		});
	}, []);
	return (
		<LayoutPlain>
			<LoaderCircular/>
		</LayoutPlain>
	);
};
