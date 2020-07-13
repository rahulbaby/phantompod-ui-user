import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter, useSubmit } from 'hooks';
import { Form, FormInput, FormSelect, FormButton, FormResult } from 'components/form';
import { CustomButton, LinkCustom } from 'components/common';
import { showMessage } from 'store/messages/actions';

import { authenticated } from '../actions';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const { triggerSubmit, result, loading, error } = useSubmit();

  const onSubmit = (data) => {
    triggerSubmit('auth/login', data, (res) => {
      if (!res.error) {
        props.onSuccess && props.onSuccess();
        dispatch(showMessage('Logged In', 'success'));
        dispatch(authenticated(res));
      }
    });
  };

  return (
    <Form onSubmit={onSubmit} noValidate style={{ backgroundColor: '#fff', padding: 10 }}>
      <FormInput
        type="email"
        label="Email"
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
      <FormResult result={result} />
      <FormButton
        type="submit"
        label="Sign In"
        className="btn signin-btn curved blue-btn wd-100"
        loading={loading}
      />
    </Form>
  );
};

export default LoginForm;
