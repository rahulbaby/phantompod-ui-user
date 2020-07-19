//context based store experimenets

import React, { createContext, useEffect, useReducer, useContext, useState } from 'react';
import { useGetDbRows } from 'hooks';
import { ErrorNotice } from 'components/common';
import { LoaderList } from 'components/loaders';
import { useGetDbRow } from 'hooks';

import { setPage } from './actions';
import { RESET_STORE } from './constants';
import reducer, { initialState } from './reducer';
/*-----------------------------------------------------*/

export const PostsContext = createContext(initialState);
export const usePostsStore = () => useContext(PostsContext); //not used here , only for component level

const limit = 2;

export const PostsStoreProvider = (props) => {
	//const { rows, loading, total } = useGetDbRows('post', {}, { page, limit });
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		setPage(dispatch)(1, props.id);
	}, []);

	const resetStore = () => {
		dispatch({
			type: RESET_STORE,
		});
		setPage(dispatch)(1, props.id);
	};

	return (
		<PostsContext.Provider value={{ state, dispatch, resetStore }}>
			{props.children}
			{state.loading && <LoaderList />}
			{state.error && <ErrorNotice />}
		</PostsContext.Provider>
	);
};

/*-----------------------------------------------------*/
export const PodDetailsContext = createContext();
export const usePodDetailsStore = () => useContext(PodDetailsContext);

export const PodDetailsStoreProvider = ({ id, children }) => {
	const { loading, row } = useGetDbRow('pod', { _id: id });

	return (
		<PodDetailsContext.Provider value={[row, loading]}>
			{loading ? (
				<LoaderList />
			) : row ? (
				children
			) : (
				<ErrorNotice title="You don't have access to this pod!" />
			)}
		</PodDetailsContext.Provider>
	);
};
