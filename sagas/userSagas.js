// store/sagas/listingSagas.js
import Router from "next/router";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  updateUserProfileSuccess,
  updateUserProfileError,
} from "../actions/userActions";

import {
  UPDATE_USER_PROFILE_REQUEST,
} from "../constants/ActionsTypes";

import {
  updateUserProfileApi,
} from "../api/userApi";

function* updateUserProfileSaga({ payload }) {
  try {
    const response = yield call(updateUserProfileApi, payload);
    yield put(updateUserProfileSuccess(response));
  } catch (error) {
    yield put(updateUserProfileError(error.message));
  }
}

export function* watchUpdateUserProfileSaga() {
  yield takeLatest(UPDATE_USER_PROFILE_REQUEST, updateUserProfileSaga);
}

export default function* rootLocationSaga() {
  yield all([
    fork(watchUpdateUserProfileSaga),
  ]);
}
