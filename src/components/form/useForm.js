import React from 'react';
import { useForm } from 'react-hook-form';

export default (defaultValues = {}, extraOptions = {}) => {
	const methods = useForm({ defaultValues, ...extraOptions });
	return methods;
};
