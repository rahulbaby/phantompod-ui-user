import { useSelector } from 'react-redux';
export { default as useGetDbRow } from './useGetDbRow';
export { default as useGetDbRows } from './useGetDbRows';
export { default as useRouter } from './useRouter';
export { default as useQuery } from './useQuery';
export { default as useSubmit } from './useSubmit';
export { default as useApiHttpCall } from './useApiHttpCall';
export { default as useItem } from './useItem';
export { default as useShowMsg } from './useShowMsg';
export { default as useRedux } from './useRedux';

export const useUserId = () => useSelector(({ auth }) => auth.user._id);
export const useIsOwner = (docUserId) => {
	const userId = useSelector(({ auth }) => (auth.user ? auth.user._id : null));
	return userId === docUserId;
};
