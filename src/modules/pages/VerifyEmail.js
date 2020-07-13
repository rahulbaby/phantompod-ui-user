import React, { useEffect, Fragment, useState } from 'react';
import { LayoutPlain } from 'layouts';
import { LoaderCircular } from 'components/loaders';
import { useRedux, useRouter } from 'hooks';
import { singOut } from 'modules/auth/actions';

export default () => {
	const { dispatch } = useRedux();
	const { history, query } = useRouter();
	useEffect(() => {
		//API call
		console.log('query', query);
	}, []);
	return (
		<LayoutPlain>
			<LoaderCircular />
		</LayoutPlain>
	);
};
