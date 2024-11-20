// store/sagas/listingSagas.js
import Router from "next/router";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  createListingSuccess,
  createListingError,
  fetchListingsSuccess,
  fetchListingsError,
  fetchListingsByProvinceSuccess,
  fetchListingsByProvinceError,
  fetchListingDetailsSuccess,
  fetchListingDetailsError,
  uploadImagesSuccess,
  uploadImagesError,
} from "../actions/listingActions";

import {
  CREATE_LISTING_REQUEST,
  FETCH_LISTINGS_REQUEST,
  FETCH_LISTINGS_BY_PROVINCE_REQUEST,
  FETCH_LISTING_DETAILS_REQUEST,
} from "../constants/ActionsTypes";

import {
  createListing,
  fetchListingsApi,
  fetchListingsByProvinceApi,
  fetchListingDetailsApi,
  uploadImagesApi,
  deleteImagesApi,
} from "../api/listingApi";

function* uploadImagesSaga(files) {
  try {
    const urls = yield call(uploadImagesApi, files); // Upload images
    yield put(uploadImagesSuccess(urls)); // Save image's URLs in reducer
    return urls;
  } catch (error) {
    yield put(uploadImagesError(error));
    throw error;
  }
}

function* createListingRequest({ payload }) {
  let uploadedPhotos;
  try {
    const { files, ...listingData } = payload;

    // Upload images and get urls
    uploadedPhotos = yield call(uploadImagesSaga, files);

    // Create listing with images urls
    const data = yield call(createListing, {
      ...listingData,
      photos: uploadedPhotos,
    });

    if (data) {
      yield put(createListingSuccess(data));
      Router.push("/");
    }
  } catch (error) {
    if (uploadedPhotos && uploadedPhotos.length > 0) {
      yield call(deleteImagesApi, uploadedPhotos); // Delete images from server if something go wrong
    }
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

function* fetchListingDetailsSaga({ payload }) {
  try {
    const details = yield call(fetchListingDetailsApi, payload);
    yield put(fetchListingDetailsSuccess(details));
  } catch (error) {
    yield put(fetchListingDetailsError(error.message));
  }
}

function* fetchListingsByProvinceSaga(action) {
  try {
    const listings = yield call(
      fetchListingsByProvinceApi,
      action.payload.province
    );
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

export function* watchFetchListingDetailsSaga() {
  yield takeLatest(FETCH_LISTING_DETAILS_REQUEST, fetchListingDetailsSaga);
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
    fork(watchFetchListingDetailsSaga)
  ]);
}
