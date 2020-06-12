import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import { FormWrapper, FormInput, FormSelect, FormButton, FormResult } from 'components/form';
import { CustomButton, CustomLink } from 'components/common';
import { instance } from 'utils';
import { showMessage } from 'store/messages/actions';

import { authenticated } from '../actions';
import OtpWrapper from './OtpWrapper';

const API = `auth`;

const useStyles = makeStyles((theme) => ({
  box: {
    '& > *': {
      padding: `0 ${theme.spacing(1)}px`,
    },
  },
}));

const SignupForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { register, control, handleSubmit, errors, reset } = useForm();
  const dispatch = useDispatch();
  let history = useHistory();

  const onSubmit = (data) => {
    setLoading(true);
    setResult(null);

    instance
      .post('user-public/reset-password', { phone: props.phone, code: props.code, ...data })
      .then((res) => {
        setLoading(false);
        setResult(res);
        if (!res.error) {
          //reset();
          props.onSuccess && props.onSuccess();
          dispatch(showMessage('Your password has been reset!', 'success'));
          history.replace('login');
          //dispatch(authenticated(res));
        }
      });
  };

  return (
    <Fragment>
      <FormWrapper onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          as={<FormInput label="OTP" fullWidth required margin="normal" autoFocus />}
          name="otp"
          control={control}
          defaultValue={''}
        />
        <Controller
          as={<FormInput type="password" label="New Password" fullWidth required margin="normal" />}
          name="password"
          control={control}
          defaultValue={''}
        />
        <FormResult result={result} />
        <FormButton
          type="submit"
          variant="contained"
          color="primary"
          label="Sign In"
          fullWidth
          loading={loading}
        />
      </FormWrapper>
    </Fragment>
  );
};

export default (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.setTitle('Reset password');
  }, []);
  return (
    <Fragment>
      <OtpWrapper>
        <SignupForm />
      </OtpWrapper>
      <Grid container className={classes.box}>
        <Grid item xs>
          <CustomLink to="/forgot-password" variant="body2">
            Forgot password?
          </CustomLink>
        </Grid>
        <Grid item xs>
          <CustomLink to="/login" variant="body2">
            {'Have an account? Sign In'}
          </CustomLink>
        </Grid>
      </Grid>
    </Fragment>
  );
};
