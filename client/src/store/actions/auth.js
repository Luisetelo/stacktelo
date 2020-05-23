import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  localStorage.setItem('app-token', token);
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('app-token');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const refreshToken = () => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .get('/api/auth/refresh')
      .then((response) => {
        dispatch(authSuccess(response.data.token));
      })
      .catch((error) => {
        dispatch(authFail(error.response));
      });
  };
};

export const auth = (email, password, history) => (dispatch) => {
  dispatch(authStart());
  axios
    .post('/api/auth/signin', { email, password })
    .then((response) => {
      dispatch(authSuccess(response.data.token));
      history.push('/');
    })
    .catch((error) => {
      dispatch(authFail(error.response));
    });
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('app-token');
    if (!token) {
      dispatch(logout());
    } else {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      dispatch(refreshToken());
    }
  };
};
