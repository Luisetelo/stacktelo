import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <>
      <p>Page not found</p>
      <button
        type="button"
        onClick={() => {
          history.push('/');
        }}
      >
        {t('Return home')}
      </button>
    </>
  );
};

export default NotFound;
