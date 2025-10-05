// app/sagas/index.js
import { all } from 'redux-saga/effects'
import authSagas from './authSagas'
import locationSagas from './locationSagas'
import listingSagas from './listingSagas'
import userSagas from './userSagas'
import {
  watchFetchAdminListings,
  watchApproveListing,
  watchChangeListingStatus,
  watchDeleteAdminListing,
  watchFetchAdminStats,
} from './adminSagas'

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    listingSagas(),
    locationSagas(),
    userSagas(),
    watchFetchAdminListings(),
    watchApproveListing(),
    watchChangeListingStatus(),
    watchDeleteAdminListing(),
    watchFetchAdminStats(),
  ])
}
