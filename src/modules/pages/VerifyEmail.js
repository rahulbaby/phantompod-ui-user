import React, { useEffect, Fragment, useState } from 'react';
import { LayoutPlain } from 'layouts';
import { LoaderCircular } from 'components/loaders';
import { useRedux, useRouter } from 'hooks';
import { singOut } from 'modules/auth/actions';

export default () => {
	const { dispatch } = useRedux();
	const { history } = useRouter();
	useEffect(() => {
		//API call
	}, []);
	return (
		<LayoutPlain>
			<LoaderCircular />
		</LayoutPlain>
	);
};
