import React, { useEffect, Fragment, useState } from 'react';
import { AuthLayout } from 'layouts';
import ForgotPasswordForm from './components/ForgotPasswordForm';

export default () => (
  <AuthLayout>
    <ForgotPasswordForm />
  </AuthLayout>
);
