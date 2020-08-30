import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import FormResult from './Result';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
});

export default ({ defaultValues, children, onSubmit, validationSchema = {}, ...rest }) => {
  const options = { defaultValues };
  if (Object.keys(validationSchema).length) options.resolver = yupResolver(validationSchema);
  const methods = useForm(options);
  const { handleSubmit, errors } = methods;
  console.log('errors', errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} {...rest}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
      <FormResult errors={errors} />
    </form>
  );
};
