import React, { useEffect, Fragment, useState } from 'react';
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

const FieldCheckBoxObj = {
  autoShare: 'Auto Share',
  autoLike: 'Auto Like',
  autoComment: 'Auto Comment',
  autoValidate: 'Auto Validate',
};

const PodForm = (props) => {
  const dispatch = useDispatch();
  const { history } = useRouter();
  const commentsDefault = useItem('comments');
  const onEdit = props.row && props.row._id;
  const { handleSubmit, register, reset, watch } = useForm(
    onEdit
      ? { ...props.row, ...{ comments: props.row.comments ? props.row.comments.join('\r\n') : '' } }
      : {
          comments: commentsDefault.join('\r\n'),
          autoComment: true,
          autoLike: true,
          autoShare: true,
          autoValidate: true,
        },
  );

  const { triggerSubmit, result, loading, error } = useSubmit();
  const watchAutoComment = watch('autoComment', props.row ? props.row.autoComment : true);

  const onSubmit = (data) => {
    data.comments = data.comments.split('\n').filter((x) => x.trim() != '');
    triggerSubmit(
      'pod',
      data,
      (res) => {
        if (!res.error) {
          props.onSuccess && props.onSuccess();
          dispatch(showMessage('Pod list updated', 'success'));
          reset();
          history.push('/pod/list');
        }
      },
      onEdit ? 'put' : 'post',
    );
  };

  const getInputProps = (name, label = '') => ({ name, label, register });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormInput {...getInputProps('_id')} type="hidden" />
      <div className="title-card">
        <div className="title-cardHead-wrapper">
          <h4 className="title-cardHead">{onEdit ? 'Pod Settings' : 'Create New Pod'}</h4>
        </div>
        <div className="title-cardDetails">
          {!onEdit && (
            <span className="title-checkbox-wrapper">
              <FormCheckbox
                {...getInputProps('isPrivate', 'This is a Private Pod')}
                className="blue-checkbox"
              />
            </span>
          )}
        </div>
      </div>
      <div className="pod-create-wrapper">
        <FormInput
          {...getInputProps('name', 'Pod Name*')}
          className="form-input curved mb-3 box-shadow border-none"
        />
        <FormTextArea
          {...getInputProps('description', 'Description*')}
          className="form-form-control mb-3 box-shadow border-none"
        />
      </div>
      <div className="checklists-wrapper">
        {Object.keys(FieldCheckBoxObj).map((x) => (
          <FormCheckbox {...getInputProps(x, FieldCheckBoxObj[x])} key={x} />
        ))}
      </div>
      <div style={{ display: watchAutoComment ? 'block' : 'none' }}>
        <h5 className="small-head">Default Comments</h5>
        <FormTextArea
          className="mb-3 box-shadow comment-area"
          {...getInputProps('comments', 'Comments')}
        />
      </div>
      <FormResult result={result} />
      <div className="right-btns-wrapper">
        <Button
          onClick={history.goBack}
          className="btn small-btn red-btn"
          type="button"
          label="Cancel"
        />
        <FormButton
          label={onEdit ? 'Update Pod' : 'Create Pod'}
          className="btn small-btn green-btn"
          loading={loading}
        />
      </div>
    </form>
  );
};

export default PodForm;
