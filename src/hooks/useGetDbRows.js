import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { instance } from 'utils';
import { isArray } from 'utils/functions';

const deepCompareEquals = (a, b) => _.isEqual(a, b);
const useDeepCompareMemoize = (value) => {
	const ref = useRef();
	if (!deepCompareEquals(value, ref.current)) {
		ref.current = value;
	}
	return ref.current;
};

const useDeepCompareEffect = (callback, dependencies) => {
	useEffect(callback, useDeepCompareMemoize(dependencies));
};

export default (url, query = {}, options = {}) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [rows, setRows] = useState([]);
	const [total, setTotal] = useState(null);
	//console.log(query, options);
	useDeepCompareEffect(() => {
		instance.get(url, { params: { query, options } }).then(({ docs, total }) => {
			if (isArray(docs)) setRows([...rows, ...docs]);
			setLoading(false);
			setTotal(total);
		});
	}, [{ ...query, ...options }]);
	return { loading, rows, total };
};
