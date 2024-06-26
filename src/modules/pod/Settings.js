import React, { useState, useEffect } from 'react';
import { LayoutMain } from 'layouts';

import { LoaderList } from 'components/loaders';
import { ErrorNotice } from 'components/common';
import { useGetDbRow, useQuery, useUserId } from 'hooks';
import PodForm from './components/Form';

const PodSettings = ({ id }) => {
	const { loading, row } = useGetDbRow('pod', { _id: id });
	const userId = useUserId();

	if (id && loading) return <LoaderList />;
	if ((!row && id) || (row && row.userId !== userId))
		return <ErrorNotice title="You don't have access!" />;
	return <PodForm row={id ? row : {}} />;
};

export default (props) => {
	const { id } = useQuery();
	return <LayoutMain>{id ? <PodSettings {...props} id={id} /> : <PodForm />}</LayoutMain>;
};
