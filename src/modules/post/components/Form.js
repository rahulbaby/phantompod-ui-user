import React from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

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
import { isLinkedInUrl } from 'utils/functions';
import { instance } from 'utils';

const FieldCheckBoxObj = {
	autoShare: 'Auto Share',
	autoLike: 'Auto Like',
	autoComment: 'Auto Comment',
};
export default ({ row, url, onSuccess }) => {
	const dispatch = useDispatch();
	const { history } = useRouter();
	const { triggerSubmit, result, loading, error } = useSubmit();
	let formRow = _.pick(row, ['comments', 'autoShare', 'autoLike', 'autoComment', 'autoValidate']);
	formRow.comments = formRow.comments.join('\n');
	const { handleSubmit, register, reset } = useForm(formRow);

	const getInputProps = (name, label = '') => ({ name, label, register });

	const onSubmit = (data) => {
		data.url = url;
		data.podId = row._id;
		data.comments = data.comments.split('\n').filter((x) => x.trim() != '');
		console.log(data.comments);
		triggerSubmit('post', data, (res) => {
			if (!res.error) {
				onSuccess && onSuccess();
				dispatch(showMessage('Post list updated', 'success'));
				reset();
				instance.get(`post/trigger-bot?id=${res._id}`);
				history.push(`/marketplace/${row._id}`);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className="title-card hyperlink">
				<a href="#">{url}</a>
			</div>
			<div className="pod-create-wrapper">
				<FormInput
					{...getInputProps('name', 'Post Title')}
					className="form-control form-input curved mb-3 box-shadow border-none"
				/>

				<div className="checklists-wrapper">
					{Object.keys(FieldCheckBoxObj).map((x) => (
						<FormCheckbox {...getInputProps(x, FieldCheckBoxObj[x])} key={x} />
					))}
				</div>
			</div>
			<h5 className="small-head">Default Comments</h5>
			<FormTextArea
				className="mb-3 box-shadow comment-area"
				{...getInputProps('comments', 'Comments')}
			/>
			<FormResult result={result} />
			<div className="right-btns-wrapper">
				<Button
					onClick={history.goBack}
					className="btn small-btn red-btn"
					type="button"
					label="Cancel"
				/>
				<FormButton label="Post" className="btn small-btn green-btn" loading={loading} />
			</div>
		</form>
	);
};
