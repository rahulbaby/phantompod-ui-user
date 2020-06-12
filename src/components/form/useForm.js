import React from 'react';
import { useForm } from 'react-hook-form';

export default (defaultValues = {}) => {
	const methods = useForm({ defaultValues });
	return methods;
};
