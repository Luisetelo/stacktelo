import * as actionTypes from '../actions/actionTypes';
import * as utils from '../../utils';

const initialState = {
  token: null,
  error: null,
  loading: true,
};

const authStart = (state) => {
  return utils.updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return utils.updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return utils.updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state) => {
  return utils.updateObject(state, { token: null, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
