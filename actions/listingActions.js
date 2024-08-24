// store/actions/locationActions.js
import {
    CREATE_LISTING_REQUEST,
    CREATE_LISTING_SUCCESS,
    CREATE_LISTING_ERROR,
  } from '../constants/ActionsTypes';


export const createListingRequest = (params) => ({
    type: CREATE_LISTING_REQUEST,
    payload: params,
});

export const createListingSuccess = (data) => ({
    type: CREATE_LISTING_SUCCESS,
    payload: data,
});

export const createListingError = (error) => ({
    type: CREATE_LISTING_ERROR,
    payload: error,
});
