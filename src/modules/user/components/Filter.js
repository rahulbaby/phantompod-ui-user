import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import FormControl from '@material-ui/core/FormControl';

import { FormWrapper, FormInput, FormSelect, FormButton, FormResult } from 'components/form';
import { CustomButton } from 'components/common';
import { instance } from 'utils';

const API = 'user';

const UserForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { register, control, handleSubmit, errors, reset } = useForm();

  const { row } = props;

  const onSubmit = (data) => {
    let where = {};
    Object.keys(data).map((x) => {
      if (data[x]) where[x] = data[x];
    });
    props.onSuccess && props.onSuccess(where);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} card>
      <Controller
        as={<FormInput label="Phone" />}
        name="phone"
        control={control}
        defaultValue={row ? row.phone : ''}
      />

      <Controller
        as={<FormInput label="Student Name" />}
        name="name"
        control={control}
        defaultValue={row ? row.name : ''}
      />
      <Controller
        as={
          <FormSelect
            label="Batch"
            options={props.batches}
            valKey={`id`}
            labelKey={`batchName`}
            style={{ width: 300 }}
          />
        }
        name="batchId"
        control={control}
        defaultValue={row ? row.batchId : ''}
      />
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
      <FormButton loading={loading} label="FILTER" size={`large`} />
    </FormWrapper>
  );
};

const mapStateToProps = ({ items }) => ({
  batches: items.rows.batches,
  accountStatusRows: items.rows.accountStatus,
});

export default connect(mapStateToProps)(UserForm);
