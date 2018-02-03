// @flow-weak
import { takeLatest, call, fork, put } from 'redux-saga/effects';
import userAPI from 'modules/api/user';
import Cookies from 'js-cookie';

const LOGIN = '@user/LOGIN_REQUEST';
const LOGIN_SUCCESS = '@user/LOGIN_SUCCESS';
const LOGOUT = '@user/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = '@user/LOGOUT_SUCCESS';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user;
    case LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
type Login = {
  payload: {
    username: string,
    password: string,
  },
};
export const login = (payload: Login) => ({
  type: LOGIN,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

/**
 * SAGAS
 */
function* loginTask({ payload }: Login) {
  // set-up your apiary/server first
  // const res = yield call(userAPI.login, payload);
  const res = {
    jwt: 'fdljafjdsjl4j3it34t0t023',
    user: {
      email: 'somebody@email.com',
      name: 'James Bond',
    },
  };
  Cookies.set('jwt_token', res.jwt, { path: '/' });
  yield put({ type: LOGIN_SUCCESS, user: { jwt: res.jwt, data: res.user } });
}

function* logoutTask() {
  yield call(userAPI.logout);
  Cookies.remove('jwt_token', { path: '/' });
  yield put({ type: LOGOUT_SUCCESS });
}

function* watchLoginTask() {
  yield takeLatest(LOGIN, loginTask);
}

function* watchlogoutTask() {
  yield takeLatest(LOGOUT, logoutTask);
}

export const userSaga = [fork(watchLoginTask), fork(watchlogoutTask)];
