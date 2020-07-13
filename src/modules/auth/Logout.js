import React, { useEffect, Fragment, useState } from 'react';
import { LayoutMain } from 'layouts';
import { LoaderCircular } from 'components/loaders';
import { useRedux, useRouter } from 'hooks';
import { singOut } from 'modules/auth/actions';

export default () => {
	const { dispatch } = useRedux();
	const { history } = useRouter();
	useEffect(() => {
		dispatch(singOut());
		history.replace('login');
	}, []);
	return (
		<LayoutMain>
			<LoaderCircular />
		</LayoutMain>
	);
};
