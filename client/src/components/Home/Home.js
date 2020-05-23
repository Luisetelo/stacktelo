import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as actions from '../../store/actions';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <h1>{t('Welcome to App!')}</h1>
      <div>
        <p>{t('Select your language')}:</p>
        <button onClick={() => changeLanguage('es')}>{t('Spanish')}</button>
        <button onClick={() => changeLanguage('en')}>{t('English')}</button>
      </div>
      {isAuthenticated ? (
        <button
          type="button"
          onClick={() => {
            dispatch(actions.logout());
          }}
        >
          {t('Logout')}
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              history.push('/signin');
            }}
          >
            {t('Sign in')}
          </button>
          <button
            type="button"
            onClick={() => {
              history.push('/signup');
            }}
          >
            {t('Sign up')}
          </button>
        </>
      )}
    </>
  );
};

export default Home;
