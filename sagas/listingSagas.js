// store/sagas/locationSagas.js
import Router from 'next/router';
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import {
    createListingSuccess,
    createListingError,
} from '../actions/listingActions';

import {
    CREATE_LISTING_REQUEST,
} from '../constants/ActionsTypes'

import { showMessage } from '../actions/notificationActions'; 
import { createListing } from '../api/listingApi';
import i18n from 'i18next';

function* createListingRequest({ payload }) {
    try {
        const data = yield call(createListing, payload);

        if (data) {
            yield put(createListingSuccess(data));

            Router.push('/');

            // Check this
            yield put(showMessage([{
                severity: 'success',
                summary: i18n.t('listing.created_summary'),
                detail: i18n.t('listing.created_detail'),
            }]));
        }
    } catch (error) {
        yield put(createListingError(error));
    }
}

export function* watchCreateListingSaga() {
    yield takeLatest(CREATE_LISTING_REQUEST, createListingRequest);
}

export default function* rootLocationSaga() {
    yield all([
        fork(watchCreateListingSaga),
    ]);
}
