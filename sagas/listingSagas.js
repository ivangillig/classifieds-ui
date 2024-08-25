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

import { createListing } from '../api/listingApi';

function* createListingRequest({ payload }) {
    try {
        const data = yield call(createListing, payload);

        if (data) {
            yield put(createListingSuccess(data));

            Router.push('/');
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
