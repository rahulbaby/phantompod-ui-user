import React, { useEffect, useState } from 'react';
import { instance } from 'utils';

const useGetApi = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const triggerApiCall = async (url, data, onSuccess, method = 'post', onError) => {
		let options = { method, url };
		if (method === 'get') options.params = data;
		else options.data = data;
		try {
			setLoading(true);
			setError(null);
			setResult(null);
			instance(options).then((res) => {
				setLoading(false);
				setError(null);
				setResult(res);
				onSuccess && onSuccess(res);
			});
		} catch (error) {
			setError(error);
			onError && onError(error);
		} finally {
			setLoading(false);
		}
	};
	return { triggerApiCall, result, loading, error };
};

export default useGetApi;
