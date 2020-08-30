import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { useRouter, useSubmit } from 'hooks';
import { Form, FormInput, FormSelect, FormButton, FormResult } from 'components/form';
import { CustomButton, LinkCustom } from 'components/common';
import { showMessage } from 'store/messages/actions';

import { authenticated } from '../actions';

const validationSchema = yup.object().shape({
  name: yup.string().required().min(3, 'Your name requires at least three characters'),
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const { triggerSubmit, result, loading, errors } = useSubmit();
  const { history } = useRouter();
  console.log('errors', errors);
  const onSubmit = (data) => {
    triggerSubmit('user', data, (res) => {
      if (!res.error) {
        props.onSuccess && props.onSuccess();
        dispatch(showMessage('Account created', 'success'));
        history.push('/notice?tmpl=0');
      }
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      noValidate
      style={{ backgroundColor: '#fff', padding: 10 }}
    >
      <FormInput
        label="Name"
        name="name"
        className="curved mb-3 box-shadow"
        placeholder="Your Name"
        autoFocus
      />
      <FormInput
        type="email"
        label="Email Address"
        name="email"
        className="curved mb-3 box-shadow"
        placeholder="Email Address"
      />
      <FormInput
        type="password"
        label="Password"
        name="password"
        className="curved mb-3 box-shadow"
        placeholder="Password"
      />
      <FormButton
        type="submit"
        label="Sign Up"
        className="btn signin-btn curved blue-btn wd-100"
        loading={loading}
      />
      <FormResult result={result} />
    </Form>
  );
};

export default SignUpForm;
