// app/sagas/index.js
import { all } from 'redux-saga/effects';
import authSagas from './authSagas';
import locationSagas from './locationSagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    locationSagas(),
  ]);
}
