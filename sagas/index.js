// app/sagas/index.js
import { all } from 'redux-saga/effects';
import watchAuthSaga from './auth';
import { watchLocationSagas } from './locationSagas';

function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchLocationSagas(),
  ]);
}

export default rootSaga;
