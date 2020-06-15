import React, { useEffect, useState } from 'react';
import { instance } from 'utils';

const useSubmit = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const triggerSubmit = async (url, data, onSuccess, method = 'post', onError) => {
		try {
			setLoading(true);
			setError(null);
			setResult(null);
			instance({
				method,
				url,
				data,
			}).then((res) => {
				console.log('res', res);
				setLoading(false);
				setError(res.error);
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
	return { triggerSubmit, result, loading, error };
};

export default useSubmit;
