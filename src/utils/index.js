import instance from './instance';
export { default as instance } from './instance';
export { default as confirmAlert } from './confirmAlert';

export const createReduxCall = (url, data, method = 'get') => {
	let options = { method, url };
	if (method === 'get') options.params = data;
	else options.data = data;
	return instance(options);
};
