import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';

import {
	useForm,
	Form,
	FormInput,
	FormTextArea,
	FormSelect,
	FormButton,
	FormResult,
	FormCheckbox,
} from 'components/form';
import { Button, LinkCustom } from 'components/common';
import { showMessage } from 'store/messages/actions';
import { useRouter, useSubmit, useItem } from 'hooks';

const validationSchema = yup.object().shape({
	subject: yup.string().required().min(5, 'Subject requires at least five characters'),
	request: yup.string().required().min(20, 'Request requires at least twenty characters'),
});

export default () => {
	const dispatch = useDispatch();
	const { history } = useRouter();
	const { handleSubmit, register, reset, errors } = useForm(
		{},
		{ resolver: yupResolver(validationSchema) },
	);

	const { triggerSubmit, result, loading, error } = useSubmit();

	const onSubmit = (data) => {
		triggerSubmit(
			'user/support-form',
			data,
			(res) => {
				if (!res.error) {
					dispatch(
						showMessage("Support request has been sent. We'll get back to you soon..", 'success'),
					);
					reset();
				}
			},
			'post',
		);
	};

	const getInputProps = (name, label = '') => ({ name, label, register });
	return (
		<div className="contact-form-wrapper">
			<h3 className="contact-form-head">Submit a Support Request</h3>
			<div className="contact-form">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className="form-group">
						<FormInput
							{...getInputProps('subject', 'Subject')}
							className="form-control form-input"
							placeholder="Subject*"
						/>
					</div>
					<div className="form-group">
						<FormTextArea
							{...getInputProps('request', 'Request')}
							className="form-control"
							id=""
							cols="30"
							rows="10"
							placeholder="Request Details*"
						/>
					</div>
					<FormResult errors={errors} />
					<div className="right-btns-wrapper">
						<button className="btn small-btn red-btn" onClick={() => reset()}>
							Cancel
						</button>
						<FormButton label="Submit" className="btn small-btn green-btn" loading={loading} />
					</div>
				</form>
			</div>
		</div>
	);
};
