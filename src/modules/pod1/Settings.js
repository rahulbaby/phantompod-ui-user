import React, { useState, useEffect } from 'react';
import { LayoutMain } from 'layouts';

import { LoaderList } from 'components/loaders';
import { ErrorNotice } from 'components/common';
import { useGetDbRow, useQuery } from 'hooks';
import PodForm from './components/Form';

const PodSettings = () => {
	const { id } = useQuery();
	const { loading, row } = useGetDbRow('pod', { _id: id });

	if (id && loading) return <LoaderList />;
	if (!row) return <ErrorNotice />;
	return <PodForm row={id ? row : {}} />;
};

export default (props) => (
	<LayoutMain>
		<PodSettings {...props} />
	</LayoutMain>
);
