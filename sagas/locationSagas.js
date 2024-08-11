// store/sagas/locationSagas.js
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import {
    FETCH_PROVINCES_REQUEST,
    fetchProvincesSuccess,
    fetchProvincesFailure,
    FETCH_CITIES_REQUEST,
    fetchCitiesSuccess,
    fetchCitiesFailure,
} from '../actions/locationsActions';

const mockProvinces = [
    { label: 'Buenos Aires', value: '1' },
    { label: 'Córdoba', value: '2' },
    { label: 'Santa Fe', value: '3' },
];

const mockCities = {
    '1': [
        { label: 'La Plata', value: '101' },
        { label: 'Mar del Plata', value: '102' },
    ],
    '2': [
        { label: 'Córdoba Capital', value: '201' },
        { label: 'Villa Carlos Paz', value: '202' },
    ],
    '3': [
        { label: 'Rosario', value: '301' },
        { label: 'Santa Fe', value: '302' },
    ],
};

function* fetchProvincesSaga() {
    try {
        // Simulate a delay
        const provinces = yield call(() => new Promise(res => setTimeout(() => res(mockProvinces), 1000)));
        yield put(fetchProvincesSuccess(provinces));
    } catch (error) {
        yield put(fetchProvincesFailure('Failed to fetch provinces'));
    }
}

// Saga to fetch cities based on the selected province
function* fetchCitiesSaga(action) {
    try {
        const cities = yield call(() => new Promise(res => setTimeout(() => res(mockCities[action.payload] || []), 1000)));
        yield put(fetchCitiesSuccess(cities));
    } catch (error) {
        yield put(fetchCitiesFailure('Failed to fetch cities'));
    }
}

export function* watchFetchProvincesSaga() {
    yield takeLatest(FETCH_PROVINCES_REQUEST, fetchProvincesSaga);
}

export function* watchFetchCitiesSaga() {
    yield takeLatest(FETCH_CITIES_REQUEST, fetchCitiesSaga);
}

export default function* rootLocationSaga() {
    yield all([
        fork(watchFetchProvincesSaga),
        fork(watchFetchCitiesSaga),
    ]);
}
