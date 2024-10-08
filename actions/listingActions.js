// store/actions/locationActions.js
import {
    CREATE_LISTING_REQUEST,
    CREATE_LISTING_SUCCESS,
    CREATE_LISTING_ERROR,
    CLEAR_LISTING_STATE,
    FETCH_LISTINGS_REQUEST,
    FETCH_LISTINGS_SUCCESS,
    FETCH_LISTINGS_ERROR,
    FETCH_LISTINGS_BY_PROVINCE_REQUEST,
    FETCH_LISTINGS_BY_PROVINCE_SUCCESS,
    FETCH_LISTINGS_BY_PROVINCE_ERROR,
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


export const clearListingState = () => ({
    type: CLEAR_LISTING_STATE,
});

export const fetchListingsRequest = (filters) => ({
  type: FETCH_LISTINGS_REQUEST,
  payload: filters,
});

export const fetchListingsSuccess = (listings) => ({
  type: FETCH_LISTINGS_SUCCESS,
  payload: listings,
});

export const fetchListingsError = (error) => ({
  type: FETCH_LISTINGS_ERROR,
  payload: error,
});

export const fetchListingsByProvinceRequest = (province) => ({
  type: FETCH_LISTINGS_BY_PROVINCE_REQUEST,
  payload: { province },
});

export const fetchListingsByProvinceSuccess = (listings) => ({
  type: FETCH_LISTINGS_BY_PROVINCE_SUCCESS,
  payload: listings,
});

export const fetchListingsByProvinceError = (error) => ({
  type: FETCH_LISTINGS_BY_PROVINCE_ERROR,
  payload: error,
});


export const uploadImagesRequest = (files) => ({
  type: 'UPLOAD_IMAGES_REQUEST',
  payload: files,
});

export const uploadImagesSuccess = (urls) => ({
  type: 'UPLOAD_IMAGES_SUCCESS',
  payload: urls,
});

export const uploadImagesError = (error) => ({
  type: 'UPLOAD_IMAGES_ERROR',
  payload: error,
});