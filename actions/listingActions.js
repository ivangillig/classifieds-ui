// store/actions/listingActions.js
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
  FETCH_LISTING_DETAILS_REQUEST,
  FETCH_LISTING_DETAILS_SUCCESS,
  FETCH_LISTING_DETAILS_ERROR,
  REPORT_LISTING_REQUEST,
  REPORT_LISTING_SUCCESS,
  REPORT_LISTING_ERROR,
  FETCH_USER_LISTINGS_REQUEST,
  FETCH_USER_LISTINGS_SUCCESS,
  FETCH_USER_LISTINGS_ERROR,
  PAUSE_LISTING_REQUEST,
  PAUSE_LISTING_SUCCESS,
  PAUSE_LISTING_ERROR,
} from "../constants/ActionsTypes";

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

export const fetchListingsByProvinceRequest = (params) => ({
  type: FETCH_LISTINGS_BY_PROVINCE_REQUEST,
  payload: params,
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
  type: "UPLOAD_IMAGES_REQUEST",
  payload: files,
});

export const uploadImagesSuccess = (urls) => ({
  type: "UPLOAD_IMAGES_SUCCESS",
  payload: urls,
});

export const uploadImagesError = (error) => ({
  type: "UPLOAD_IMAGES_ERROR",
  payload: error,
});

export const fetchListingDetailsRequest = (id) => ({
  type: FETCH_LISTING_DETAILS_REQUEST,
  payload: id,
});

export const fetchListingDetailsSuccess = (data) => ({
  type: FETCH_LISTING_DETAILS_SUCCESS,
  payload: data,
});

export const fetchListingDetailsError = (error) => ({
  type: FETCH_LISTING_DETAILS_ERROR,
  payload: error,
});

export const reportListingRequest = (params) => ({
  type: REPORT_LISTING_REQUEST,
  payload: params,
});

export const reportListingSuccess = (data) => ({
  type: REPORT_LISTING_SUCCESS,
  payload: data,
});

export const reportListingError = (error) => ({
  type: REPORT_LISTING_ERROR,
  payload: error,
});

export const fetchUserListingsRequest = (status) => ({
  type: FETCH_USER_LISTINGS_REQUEST,
  payload: status,
});

export const fetchUserListingsSuccess = (listings) => ({
  type: FETCH_USER_LISTINGS_SUCCESS,
  payload: listings,
});

export const fetchUserListingsError = (error) => ({
  type: FETCH_USER_LISTINGS_ERROR,
  payload: error,
});

// actions/listingActions.js
export const pauseListingRequest = (listingId) => ({
  type: PAUSE_LISTING_REQUEST,
  payload: listingId,
});

export const pauseListingSuccess = (listingId) => ({
  type: PAUSE_LISTING_SUCCESS,
  payload: listingId,
});

export const pauseListingError = (error) => ({
  type: PAUSE_LISTING_ERROR,
  payload: error,
});
