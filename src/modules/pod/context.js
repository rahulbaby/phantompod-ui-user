import React, { createContext, useContext, useReducer, Fragment } from 'react';
const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

export const useStateContext = () => useContext(StateContext);

/*-----------------------------------------*/

const initialState = { row: null, loading: false };

const reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_ROW':
			return { row: action.payload.row, loading: false };
		default:
			throw new Error();
	}
};

export const PodContextProvider = (props) => (
	<StateProvider reducer={reducer} initialState={initialState}>
		{props.children}
	</StateProvider>
);
