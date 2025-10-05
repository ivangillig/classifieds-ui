// sagas/adminSagas.js
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  FETCH_ADMIN_LISTINGS_REQUEST,
  APPROVE_LISTING_REQUEST,
  CHANGE_LISTING_STATUS_REQUEST,
  DELETE_ADMIN_LISTING_REQUEST,
  FETCH_ADMIN_STATS_REQUEST,
} from '../constants/ActionsTypes'
import {
  fetchAdminListingsSuccess,
  fetchAdminListingsError,
  approveListingSuccess,
  approveListingError,
  changeListingStatusSuccess,
  changeListingStatusError,
  deleteAdminListingSuccess,
  deleteAdminListingError,
  fetchAdminStatsSuccess,
  fetchAdminStatsError,
} from '../actions/adminActions'
import {
  getAdminListings,
  approveListingApi,
  changeListingStatusApi,
  deleteAdminListingApi,
  getAdminStatsApi,
} from '../api/listingApi'
import { showMessage } from '../actions/notificationActions'

// Fetch Admin Listings Saga
function* fetchAdminListingsSaga(action) {
  try {
    const response = yield call(getAdminListings, action.payload)
    yield put(fetchAdminListingsSuccess(response))
  } catch (error) {
    yield put(
      fetchAdminListingsError(error.response?.data?.message || error.message)
    )
  }
}

// Approve Listing Saga
function* approveListingSaga(action) {
  try {
    const response = yield call(approveListingApi, action.payload)
    yield put(approveListingSuccess(response.data))

    yield put(
      showMessage({
        type: 'success',
        detail: 'admin.listing_approved',
      })
    )
  } catch (error) {
    yield put(
      approveListingError(error.response?.data?.message || error.message)
    )
  }
}

// Unified Change Listing Status Saga
function* changeListingStatusSaga(action) {
  try {
    const { listingId, newStatus, reason } = action.payload
    const response = yield call(
      changeListingStatusApi,
      listingId,
      newStatus,
      reason
    )

    if (response && response.data) {
      // Contextual success messages
      let message = 'admin.status_updated'
      switch (newStatus) {
        case 'rejected':
          message = 'admin.listing_rejected'
          break
        case 'blocked':
          message = 'admin.listing_blocked'
          break
        case 'published':
          message = 'admin.listing_reactivated'
          break
      }

      yield put(
        showMessage({
          type: 'success',
          detail: message,
        })
      )
      yield put(changeListingStatusSuccess(response.data))
    }
  } catch (error) {
    yield put(
      changeListingStatusError(error.response?.data?.message || error.message)
    )
  }
}

// Delete Admin Listing Saga
function* deleteAdminListingSaga(action) {
  try {
    yield call(deleteAdminListingApi, action.payload)
    yield put(deleteAdminListingSuccess(action.payload))

    yield put(
      showMessage({
        type: 'success',
        detail: 'admin.listing_deleted',
      })
    )
  } catch (error) {
    yield put(
      deleteAdminListingError(error.response?.data?.message || error.message)
    )
  }
}

// Fetch Admin Stats Saga
function* fetchAdminStatsSaga() {
  try {
    const response = yield call(getAdminStatsApi)
    yield put(fetchAdminStatsSuccess(response.data))
  } catch (error) {
    yield put(
      fetchAdminStatsError(error.response?.data?.message || error.message)
    )
  }
}

// Watcher Sagas
export function* watchFetchAdminListings() {
  yield takeEvery(FETCH_ADMIN_LISTINGS_REQUEST, fetchAdminListingsSaga)
}

export function* watchApproveListing() {
  yield takeEvery(APPROVE_LISTING_REQUEST, approveListingSaga)
}

export function* watchChangeListingStatus() {
  yield takeEvery(CHANGE_LISTING_STATUS_REQUEST, changeListingStatusSaga)
}

export function* watchFetchAdminStats() {
  yield takeEvery(FETCH_ADMIN_STATS_REQUEST, fetchAdminStatsSaga)
}

export function* watchDeleteAdminListing() {
  yield takeEvery(DELETE_ADMIN_LISTING_REQUEST, deleteAdminListingSaga)
}
