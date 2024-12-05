// app/sagas/authSaga.js
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import Axios from 'axios';
import Router from 'next/router';
import {  
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  getUserInfoSuccess,
  getUserInfoFailure
} from "../actions/authActions";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  GET_USER_INFO_REQUEST
} from '../constants/ActionsTypes'
import {
  signInRequest, 
  signOutRequest,
  getUserInfoApi 
} from "../api/authApi";

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

function* getUserInfo() {
  try {
    const response = yield call(getUserInfoApi);

    if (response && response.data && response.data.user) {
      const user = response.data.user;
      yield put(getUserInfoSuccess(user));
      localStorage.setItem('user', JSON.stringify(user));
      Router.push('/');
    } 
  } catch (error) {
    yield put(getUserInfoFailure(error.message));
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

export function* watchGetUserInfo() {
  yield takeLatest(GET_USER_INFO_REQUEST, getUserInfo);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginSaga),
    fork(watchLogoutSaga),
    fork(watchGetUserInfo),
  ]);
}

export function cleanupStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
