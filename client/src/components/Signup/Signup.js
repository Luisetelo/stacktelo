import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const [response, setResponse] = useState(null);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const signupForm = (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(t('Invalid email address'))
            .required(t('Required')),
          password: Yup.string()
            .min(8, t('Must be 8 characters or more'))
            .required(t('Required')),
        })}
        onSubmit={(values) => {
          axios
            .post('/api/auth/signup', values)
            .then(() => {
              setIsUserCreated(true);
            })
            .catch(() => {
              setResponse(t('Something happened, please try again later'));
            });
        }}
      >
        <Form>
          <p>{t('Sign up with your email and a password')}.</p>
          <br />
          <label htmlFor="email">{t('Email')}</label>
          <Field name="email" type="text" />
          <ErrorMessage name="email" />
          <br />
          <label htmlFor="password">{t('Password')}</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
          <br />
          <button type="submit">{t('Submit')}</button>
          <br />
        </Form>
      </Formik>
      <p>
        {t('Already have an account?')}
        <button
          type="button"
          onClick={() => {
            history.push('/signin');
          }}
        >
          {t('Sign in')}
        </button>
      </p>
    </>
  );

  const userCreatedMessage = (
    <>
      <h2>Your user have been created!</h2>
      <br />
      <p>Click here to go to sign in screen</p>
      <button
        type="button"
        onClick={() => {
          history.push('/signin');
        }}
      >
        Sign in
      </button>
    </>
  );

  return (
    <>
      <h1>Sign up to App.</h1>
      {isUserCreated ? userCreatedMessage : signupForm}
      <p>{response}</p>
    </>
  );
};

export default Signup;
