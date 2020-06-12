import React, { useState, useEffect } from 'react';
import { instance } from 'utils';
export default (url, query = {}, options = {}) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [row, setRow] = useState(null);

	useEffect(() => {
		instance.get(url, { params: { query, options } }).then(({ docs }) => {
			setRow(docs ? docs[0] : null);
			setLoading(false);
		});
	}, []);
	return { loading, row };
};
