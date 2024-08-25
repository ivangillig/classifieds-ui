import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  fetchProvincesSuccess,
  fetchProvincesFailure,
  fetchCitiesSuccess,
  fetchCitiesFailure,
} from "../actions/locationsActions";

import {
  FETCH_PROVINCES_REQUEST,
  FETCH_CITIES_REQUEST,
} from "../constants/ActionsTypes";

import { fetchProvincesFromApi, fetchCitiesFromApi } from "../api/locationApi";

// Saga to fetch provinces from the API
function* fetchProvincesSaga() {
  try {
    const provinces = yield call(fetchProvincesFromApi);
    console.log('provinces en sagas: ', provinces)
    yield put(fetchProvincesSuccess(provinces));
  } catch (error) {
    yield put(fetchProvincesFailure("Failed to fetch provinces"));
  }
}

// Saga to fetch cities based on the selected province from the API
function* fetchCitiesSaga(action) {
  try {
    const cities = yield call(fetchCitiesFromApi, action.payload);
    yield put(fetchCitiesSuccess(cities));
  } catch (error) {
    yield put(fetchCitiesFailure("Failed to fetch cities"));
  }
}

export function* watchFetchProvincesSaga() {
  yield takeLatest(FETCH_PROVINCES_REQUEST, fetchProvincesSaga);
}

export function* watchFetchCitiesSaga() {
  yield takeLatest(FETCH_CITIES_REQUEST, fetchCitiesSaga);
}

export default function* rootLocationSaga() {
  yield all([fork(watchFetchProvincesSaga), fork(watchFetchCitiesSaga)]);
}
