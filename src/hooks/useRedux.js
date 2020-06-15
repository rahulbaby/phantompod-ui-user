import { useSelector, useDispatch } from 'react-redux';

export default () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const getReduxItem = (itemKey) => state[itemKey];

	return { dispatch, getReduxItem };
};
