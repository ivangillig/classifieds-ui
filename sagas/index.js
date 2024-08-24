// app/sagas/index.js
import { all } from 'redux-saga/effects';
import authSagas from './authSagas';
import locationSagas from './locationSagas';
import listingSagas from './listingSagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    listingSagas(),
    locationSagas(),
  ]);
}
