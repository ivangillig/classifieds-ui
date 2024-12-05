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
  reportListingSuccess,
  reportListingError,
  fetchUserListingsSuccess,
  toggleListingStatusSuccess,
  toggleListingStatusError,
  deleteListingSuccess,
  deleteListingtError,
  editListingSuccess,
  renewListingSuccess,
  renewListingtError,
} from "../actions/listingActions";

import {
  CREATE_LISTING_REQUEST,
  FETCH_LISTINGS_REQUEST,
  FETCH_LISTINGS_BY_PROVINCE_REQUEST,
  FETCH_LISTING_DETAILS_REQUEST,
  REPORT_LISTING_REQUEST,
  FETCH_USER_LISTINGS_REQUEST,
  TOGGLE_LISTING_STATUS_REQUEST,
  DELETE_LISTING_REQUEST,
  EDIT_LISTING_REQUEST,
  RENEW_LISTING_REQUEST,
} from "../constants/ActionsTypes";

import {
  createListing,
  fetchListingsApi,
  fetchListingsByProvinceApi,
  fetchListingDetailsApi,
  uploadImagesApi,
  deleteImagesApi,
  reportListingApi,
  fetchUserListingsApi,
  toggleListingStatusApi,
  deleteListingApi,
  editListingApi,
  renewListingApi,
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
    const { photos, ...listingData } = payload;

    // Upload images and get urls
    uploadedPhotos = yield call(uploadImagesSaga, photos);

    // Create listing with images urls
    const data = yield call(createListing, {
      ...listingData,
      photos: uploadedPhotos,
    });

    if (data) {
      yield put(createListingSuccess(data));
      Router.push("/user/private/my-listings/underReview");
    }
  } catch (error) {
    if (uploadedPhotos && uploadedPhotos.length > 0) {
      yield call(deleteImagesApi, uploadedPhotos); // Delete images from server if something go wrong
    }
    yield put(createListingError(error));
  }
}

function* editListingRequest({ payload }) {
  try {
    const { photos, removedImages, currentImages, ...listingData } = payload;

    // Upload new images if exists
    let uploadedImages = [];
    if (photos.length > 0) {
      uploadedImages = yield call(uploadImagesApi, photos);
    }

    const data = yield call(editListingApi, {
      ...listingData,
      photos: [...currentImages, ...uploadedImages],
    });

    yield put(editListingSuccess(data));
    Router.push("/user/private/my-listings/underReview");
  } catch (error) {
    yield put(createListingError(error.message));
  }
}

function* reportListingSaga({ payload }) {
  try {
    const response = yield call(reportListingApi, payload);
    yield put(reportListingSuccess(response));
  } catch (error) {
    yield put(reportListingError(error.message));
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
    const { province, page, limit } = action.payload;
    const response = yield call(fetchListingsByProvinceApi, {
      province,
      page,
      limit,
    });
    yield put(fetchListingsByProvinceSuccess(response));
  } catch (error) {
    yield put(fetchListingsByProvinceError(error.message));
  }
}

function* fetchUserListingsSaga({ payload }) {
  try {
    const response = yield call(fetchUserListingsApi, payload);
    yield put(fetchUserListingsSuccess(response));
  } catch (error) {
    // TODO: should handle this with middleware
    // yield put(fetchUserListingsError(error.message));
  }
}

function* toggleListingStatusSaga({ payload }) {
  try {
    const response = yield call(toggleListingStatusApi, payload);
    yield put(toggleListingStatusSuccess(response));
  } catch (error) {
    yield put(toggleListingStatusError(error.message));
  }
}

function* renewListingSaga({ payload }) {
  try {
    const response = yield call(renewListingApi, payload);
    yield put(renewListingSuccess(response));
  } catch (error) {
    yield put(renewListingtError(error.message));
  }
}

function* deleteListingSaga({ payload }) {
  try {
    const response = yield call(deleteListingApi, payload);
    yield put(deleteListingSuccess(response));
  } catch (error) {
    yield put(deleteListingtError(error.message));
  }
}

export function* watchCreateListingSaga() {
  yield takeLatest(CREATE_LISTING_REQUEST, createListingRequest);
}

export function* watchEditListingSaga() {
  yield takeLatest(EDIT_LISTING_REQUEST, editListingRequest);
}

export function* watchFetchListingsSaga() {
  yield takeLatest(FETCH_LISTINGS_REQUEST, fetchListingsSaga);
}

export function* watchFetchListingDetailsSaga() {
  yield takeLatest(FETCH_LISTING_DETAILS_REQUEST, fetchListingDetailsSaga);
}

export function* watchReportListingSaga() {
  yield takeLatest(REPORT_LISTING_REQUEST, reportListingSaga);
}

export function* watchFetchListingsByProvinceSaga() {
  yield takeLatest(
    FETCH_LISTINGS_BY_PROVINCE_REQUEST,
    fetchListingsByProvinceSaga
  );
}

export function* watchFetchUserListingsSaga() {
  yield takeLatest(FETCH_USER_LISTINGS_REQUEST, fetchUserListingsSaga);
}

export function* watchToggleListingStatusSaga() {
  yield takeLatest(TOGGLE_LISTING_STATUS_REQUEST, toggleListingStatusSaga);
}

export function* watchDeleteListingSaga() {
  yield takeLatest(DELETE_LISTING_REQUEST, deleteListingSaga);
}

export function* watchRenewListingSaga() {
  yield takeLatest(RENEW_LISTING_REQUEST, renewListingSaga);
}

export default function* rootLocationSaga() {
  yield all([
    fork(watchCreateListingSaga),
    fork(watchEditListingSaga),
    fork(watchFetchListingsSaga),
    fork(watchFetchListingsByProvinceSaga),
    fork(watchFetchListingDetailsSaga),
    fork(watchReportListingSaga),
    fork(watchFetchUserListingsSaga),
    fork(watchToggleListingStatusSaga),
    fork(watchDeleteListingSaga),
    fork(watchRenewListingSaga),
  ]);
}
