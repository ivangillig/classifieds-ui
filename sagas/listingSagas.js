// store/sagas/locationSagas.js
import Router from "next/router";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  createListingSuccess,
  createListingError,
  fetchListingsSuccess,
  fetchListingsError,
  fetchListingsByProvinceSuccess,
  fetchListingsByProvinceError,
} from "../actions/listingActions";

import {
  CREATE_LISTING_REQUEST,
  FETCH_LISTINGS_REQUEST,
  FETCH_LISTINGS_BY_PROVINCE_REQUEST,
} from "../constants/ActionsTypes";

import {
  createListing,
  fetchListingsApi,
  fetchListingsByProvinceApi,
} from "../api/listingApi";

function* createListingRequest({ payload }) {
  try {
    const data = yield call(createListing, payload);

    if (data) {
      yield put(createListingSuccess(data));

      Router.push("/");
    }
  } catch (error) {
    yield put(createListingError(error));
  }
}

function* fetchListingsSaga(action) {
  try {
    const listings = yield call(fetchListingsApi, action.payload);
    yield put(fetchListingsSuccess(listings));
  } catch (error) {
    yield put(fetchListingsError(error.message));
  }
}

function* fetchListingsByProvinceSaga(action) {
  try {
    const listings = yield call(fetchListingsByProvinceApi, action.payload.province);
    yield put(fetchListingsByProvinceSuccess(listings));
  } catch (error) {
    yield put(fetchListingsByProvinceError(error.message));
  }
}

export function* watchCreateListingSaga() {
  yield takeLatest(CREATE_LISTING_REQUEST, createListingRequest);
}

export function* watchFetchListingsSaga() {
  yield takeLatest(FETCH_LISTINGS_REQUEST, fetchListingsSaga);
}

export function* watchFetchListingsByProvinceSaga() {
  yield takeLatest(
    FETCH_LISTINGS_BY_PROVINCE_REQUEST,
    fetchListingsByProvinceSaga
  );
}

export default function* rootLocationSaga() {
  yield all([
    fork(watchCreateListingSaga),
    fork(watchFetchListingsSaga),
    fork(watchFetchListingsByProvinceSaga),
  ]);
}
