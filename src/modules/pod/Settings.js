import React, { useState, useEffect } from 'react';
import { LayoutMain } from 'layouts';

import { LoaderList } from 'components/loaders';
import { useGetDbRow, useQuery } from 'hooks';
import PodForm from './components/Form';

const PodSettings = () => {
	const { id } = useQuery();
	const { loading, row } = useGetDbRow('pod', { _id: id });

	if (id && loading) return <LoaderList />;
	return <PodForm row={id ? row : {}} />;
};

export default (props) => (
	<LayoutMain>
		<PodSettings {...props} />
	</LayoutMain>
);
