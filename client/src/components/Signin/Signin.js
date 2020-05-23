import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { useTranslation } from 'react-i18next';

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('Sign in to App')}.</h1>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(t('Invalid email address'))
            .required(t('Required')),
          password: Yup.string().required(t('Required')),
        })}
        onSubmit={(values) => {
          dispatch(actions.auth(values.email, values.password, history));
        }}
      >
        <Form>
          <p>{t('Enter your email address and password')}.</p>
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
        {t('Don’t have an account yet?')}
        <button
          type="button"
          onClick={() => {
            history.push('/signup');
          }}
        >
          {t('Sign up')}
        </button>
      </p>
    </>
  );
};

export default Signin;
