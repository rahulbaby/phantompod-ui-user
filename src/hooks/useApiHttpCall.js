import React, { useEffect, useState } from 'react';
import { instance } from 'utils';

const useApiHttpCall = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const triggerApiCall = async (url, data, onSuccess, method = 'post', onError) => {
		let options = { method, url };
		if (method === 'get') options.params = data;
		else options.data = data;
		setLoading(true);
		setError(null);
		setResult(null);
		try {
			instance(options).then((res) => {
				setError(null);
				setResult(res);
				setLoading(false);
				if (!res.error) onSuccess && onSuccess(res);
				else onError && onError(res);
			});
		} catch (error) {
			setError(error);
			setLoading(false);
			onError && onError(error);
		} finally {
			//setLoading(false);
		}
	};
	return { triggerApiCall, result, loading, error };
};

export default useApiHttpCall;
