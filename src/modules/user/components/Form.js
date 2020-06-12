import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { FormWrapper, FormInput, FormSelect, FormButton, FormResult } from 'components/form';
import { CustomButton } from 'components/common';
import { instance } from 'utils';
import { showMessage } from 'store/messages/actions';

const API = 'user';

const UserForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { register, control, handleSubmit, errors, reset } = useForm();

  const { row } = props;

  const onSubmit = (data) => {
    setLoading(true);
    setResult(null);
    data.password = 'sarath';

    if (row && row.id) data.id = row.id;

    let successMessage = `${data.name} ${row ? ' updated!' : ' added to list'}`;
    instance({
      method: 'post',
      url: API,
      data,
    }).then((res) => {
      setLoading(false);
      setResult(res);
      if (!res.error) {
        reset();
        props.onSuccess && props.onSuccess();
        props.dispatch(showMessage(successMessage, 'success'));
      }
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={<FormInput label="Phone" />}
        name="phone"
        control={control}
        defaultValue={row ? row.phone : ''}
      />
      <br />
      <Controller
        as={<FormInput label="Student Name" />}
        name="name"
        control={control}
        defaultValue={row ? row.name : ''}
      />
      <br />
      <Controller
        as={
          <FormSelect
            label="Batch"
            options={props.batches}
            labelKey={`batchName`}
            style={{ width: 300 }}
          />
        }
        name="batchId"
        control={control}
        defaultValue={row ? row.batchId : ''}
      />
      <br />
      <Controller
        as={
          <FormSelect
            label="Status"
            options={props.accountStatusRows}
            valKey={`accountStatusId`}
            labelKey={`accountStatusLabel`}
            style={{ width: 200 }}
          />
        }
        name="accountStatus"
        control={control}
        defaultValue={row ? row.accountStatus : ''}
      />
      <br />
      <FormButton loading={loading} />
      <CustomButton
        label="cancel"
        color="default"
        onClick={() => props.onCancel && props.onCancel()}
      />
      <FormResult result={result} />
    </FormWrapper>
  );
};

const mapStateToProps = ({ items }) => ({
  batches: items.rows.batches,
  accountStatusRows: items.rows.accountStatus,
});

export default connect(mapStateToProps)(UserForm);
