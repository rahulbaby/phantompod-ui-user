import React, { useCallback, useMemo } from 'react';
import { useRedux } from 'hooks';
import * as yup from 'yup';
import { getNames } from 'country-list';
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
import { useRouter, useSubmit, useItem } from 'hooks';
import { showMessage } from 'store/messages/actions';
import { refreshUser } from 'modules/auth/actions';

const countryListArr = getNames();

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required()
		.min(3)
		.matches(/^[a-z ,.'-]+$/i, 'name is not in proper format'),
	country: yup.string().required(),
	state: yup
		.string()
		.required()
		.min(3),
		//.matches(/^[a-z ,.'-]+$/i, 'name is not in proper format'),
	streetAddress: yup
		.string()
		.min(3)
		.required('street address is a required field'),
		//.matches(/^[a-z ,.'-]+$/i, 'name is not in proper format'),
	city: yup.string().required(),
	zip: yup.string().required().min(3),
});

const UserBillingForm = (props) => {
	const { history } = useRouter();
	const commentsDefault = useItem('comments');
	const { triggerSubmit, result, loading, error } = useSubmit();
	const { dispatch, getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const row = authData.user.billingDetails;
	const onEdit = row && row.name && row.name !== '';

	const { handleSubmit, register, reset, errors } = useForm(row, {
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		triggerSubmit('user/update-billing-details', data, (res) => {
			if (!res.error) {
				props.onSuccess && props.onSuccess();
				dispatch(showMessage('Billing details updated', 'success'));
				dispatch(refreshUser());
			}
		});
	};

	const getInputProps = (name, label = '') => ({ name, label, register });
	return (
		<div className="billing-form">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="form-group">
					<FormInput {...getInputProps('name', 'Full Name*')} className="form-control form-Input" />
				</div>
				<div className="form-group">
					<FormInput
						{...getInputProps('companyName', 'Company Name (optional)')}
						className="form-control form-Input"
					/>
				</div>
				<div className="row">
					<div className="col-xl-6">
						<div className="form-group">
							<FormSelect
								{...getInputProps('country', 'Country*')}
								options={countryListArr}
								className="form-control"
							/>
						</div>
					</div>
					<div className="col-xl-6">
						<div className="form-group">
							<FormInput
								{...getInputProps('state', 'State/Province')}
								className="form-control form-Input"
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<FormInput
						{...getInputProps('Street Address', 'Street Address')}
						className="form-control form-Input"
					/>
				</div>
				<div className="form-group">
					<FormInput {...getInputProps('city', 'City')} className="form-control form-Input" />
				</div>
				<div className="form-group">
					<FormInput
						{...getInputProps('zip', 'Postal Code/ ZIP')}
						className="form-control form-Input"
					/>
				</div>
				<div className="form-group">
					<FormInput
						{...getInputProps('vatNumber', 'VAT Number (Mandatory for EU Countries)')}
						className="form-control form-Input"
					/>
				</div>
				<FormResult errors={errors} />
				<div className="right-btns-wrapper">
					{props.onCancel && (
						<button onCancel={props.onCancel} className="btn small-btn red-btn">
							Cancel
						</button>
					)}
					<FormButton
						label={onEdit ? 'Update' : 'Add'}
						className="btn small-btn green-btn"
						loading={loading}
					/>
				</div>
			</form>
		</div>
	);
};

export default UserBillingForm;
