// app/sagas/authSaga.js
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { LOGIN_REQUEST, LOGOUT_REQUEST, loginSuccess, loginFailure, logoutSuccess, logoutFailure } from "../actions/authActions";
import { signInRequest, signOutRequest } from "../api/authApi";
import Axios from 'axios';
import Router from 'next/router';

function* loginSaga() {
  try {
    const user = yield call(signInRequest);

    // Ensure it's a clean login (i.e., nothing left from a previous login)
    cleanupStorage();

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      Axios.defaults.headers.common['authorization'] = user.id;
    }

    yield put(loginSuccess(user));

    // Redirect to the home page after successful login
    Router.push('/');
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* logoutSaga() {
  try {
    yield call(signOutRequest);

    cleanupStorage();
    delete Axios.defaults.headers.common['Authorization'];

    Router.push('/');

    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginSaga),
    fork(watchLogoutSaga),
  ]);
}

export function cleanupStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
