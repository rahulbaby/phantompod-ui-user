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
export const useMarketplaceStore = () => useContext(PostsContext); //not used her , only for component level

const limit = 2;

export const MarketplaceStoreProvider = (props) => {
	//const { rows, loading, total } = useGetDbRows('post', {}, { page, limit });
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		setPage(dispatch)(1);
	}, []);

	const resetStore = () => {
		dispatch({
			type: RESET_STORE,
		});
		setPage(dispatch)(1);
	};

	return (
		<PostsContext.Provider value={{ state, dispatch, resetStore }}>
			{props.children}
			{state.loading && <LoaderList />}
			{state.error && <ErrorNotice title="You don't have acces to this pod!" />}
		</PostsContext.Provider>
	);
};
