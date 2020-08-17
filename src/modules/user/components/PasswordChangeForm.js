import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

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
import { showMessage } from 'store/messages/actions';
import { useRouter, useSubmit, useItem } from 'hooks';

const validationSchema = yup.object().shape({
	oldPassword: yup.string().required('Old password is required'),
	newPassword: yup.string().required('New password is required'),
});

const API_URL = 'user/reset-password';
const UserPasswordChangeForm = ({ setShowPasswordForm, onSuccess }) => {
	const dispatch = useDispatch();
	const { handleSubmit, register, reset, errors } = useForm({}, { validationSchema });

	const { triggerSubmit, result, loading, error } = useSubmit();

	const onSubmit = (data) => {
		triggerSubmit('user/reset-password', data, (res) => {
			if (!res.error) {
				onSuccess && onSuccess();
				dispatch(showMessage('Password updated!', 'success'));
				reset();
			}
		});
	};

	const getInputProps = (name, label = '') => ({ name, register });
	return (
		<div className="change-password-wrapper">
			<div className="change-password box-shadow">
				<h4 className="change-password-head">Change password</h4>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className="row">
						<div className="col-lg-6">
							<div className="form-group">
								<label className="form-label">Old password</label>
								<FormInput
									{...getInputProps('oldPassword', 'Pod Name')}
									className="form-control  form-Input"
									type="password"
								/>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label className="form-label">New password</label>
								<FormInput
									{...getInputProps('newPassword', 'Pod Name')}
									className="form-control  form-Input"
									type="password"
								/>
							</div>
						</div>
					</div>
					<FormResult result={result} errors={errors} />
					<div className="right-btns-wrapper">
						<button
							type="button"
							className="btn small-btn red-btn"
							onClick={() => setShowPasswordForm(false)}
						>
							Cancel
						</button>
						<button className="btn small-btn green-btn">Change</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserPasswordChangeForm;
