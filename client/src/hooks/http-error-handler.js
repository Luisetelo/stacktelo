import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

export default () => {
  const dispatch = useDispatch();
  const responseInterceptor = axios.interceptors.response.use(
    (response) => response,
    (responseError) => {
      if (responseError.response.status === 401) {
        dispatch(actions.logout());
      }
      return Promise.reject(responseError);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor]);

  return [];
};
