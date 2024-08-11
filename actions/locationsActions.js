// store/actions/locationActions.js
import {
    FETCH_PROVINCES_REQUEST,
    FETCH_PROVINCES_SUCCESS,
    FETCH_PROVINCES_FAILURE,
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_FAILURE,
  } from '../constants/ActionsTypes';

export const fetchProvincesRequest = () => ({
    type: FETCH_PROVINCES_REQUEST,
});

export const fetchProvincesSuccess = (provinces) => ({
    type: FETCH_PROVINCES_SUCCESS,
    payload: provinces,
});

export const fetchProvincesFailure = (error) => ({
    type: FETCH_PROVINCES_FAILURE,
    payload: error,
});

export const fetchCitiesRequest = (provinceId) => ({
    type: FETCH_CITIES_REQUEST,
    payload: provinceId,
});

export const fetchCitiesSuccess = (cities) => ({
    type: FETCH_CITIES_SUCCESS,
    payload: cities,
});

export const fetchCitiesFailure = (error) => ({
    type: FETCH_CITIES_FAILURE,
    payload: error,
});
