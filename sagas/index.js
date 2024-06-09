// app/sagas/index.js
import { all } from 'redux-saga/effects';
import watchAuthSaga from './auth';

function* rootSaga() {
  yield all([
    watchAuthSaga(),
  ]);
}

export default rootSaga;
