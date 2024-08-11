// store/reducers/locationReducer.js
import {
    FETCH_PROVINCES_REQUEST,
    FETCH_PROVINCES_SUCCESS,
    FETCH_PROVINCES_FAILURE,
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_FAILURE,
} from '../actions/locationsActions';

const initialState = {
    provinces: [],
    cities: [],
    loadingProvinces: false,
    loadingCities: false,
    error: null,
};

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROVINCES_REQUEST:
            return {
                ...state,
                loadingProvinces: true,
                error: null,
            };
        case FETCH_PROVINCES_SUCCESS:
            return {
                ...state,
                loadingProvinces: false,
                provinces: action.payload,
            };
        case FETCH_PROVINCES_FAILURE:
            return {
                ...state,
                loadingProvinces: false,
                error: action.payload,
            };
        case FETCH_CITIES_REQUEST:
            return {
                ...state,
                loadingCities: true,
                error: null,
            };
        case FETCH_CITIES_SUCCESS:
            return {
                ...state,
                loadingCities: false,
                cities: action.payload,
            };
        case FETCH_CITIES_FAILURE:
            return {
                ...state,
                loadingCities: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
