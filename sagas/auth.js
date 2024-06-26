// app/sagas/authSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, loginSuccess, loginFailure } from "../actions/auth";
import { fetchUserApi } from "../api/auth";

function* loginSaga() {
  try {
    const user = yield call(fetchUserApi);
    localStorage.setItem('user', JSON.stringify(user));

    yield put(loginSuccess(user));
    window.location.href = '/';
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}