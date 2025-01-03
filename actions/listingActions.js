// store/actions/listingActions.js
import {
  CREATE_LISTING_REQUEST,
  CREATE_LISTING_SUCCESS,
  CREATE_LISTING_ERROR,
  EDIT_LISTING_REQUEST,
  EDIT_LISTING_SUCCESS,
  EDIT_LISTING_ERROR,
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
  TOGGLE_LISTING_STATUS_REQUEST,
  TOGGLE_LISTING_STATUS_SUCCESS,
  TOGGLE_LISTING_STATUS_ERROR,
  DELETE_LISTING_REQUEST,
  DELETE_LISTING_SUCCESS,
  DELETE_LISTING_ERROR,
  RENEW_LISTING_REQUEST,
  RENEW_LISTING_SUCCESS,
  RENEW_LISTING_ERROR,
  SEARCH_LISTINGS_REQUEST,
  SEARCH_LISTINGS_SUCCESS,
  SEARCH_LISTINGS_ERROR,
} from '../constants/ActionsTypes'

export const createListingRequest = (params) => ({
  type: CREATE_LISTING_REQUEST,
  payload: params,
})

export const createListingSuccess = (data) => ({
  type: CREATE_LISTING_SUCCESS,
  payload: data,
})

export const createListingError = (error) => ({
  type: CREATE_LISTING_ERROR,
  payload: error,
})

export const editListingRequest = (params) => ({
  type: EDIT_LISTING_REQUEST,
  payload: params,
})

export const editListingSuccess = (data) => ({
  type: EDIT_LISTING_SUCCESS,
  payload: data,
})

export const editListingError = (error) => ({
  type: EDIT_LISTING_ERROR,
  payload: error,
})

export const clearListingState = () => ({
  type: CLEAR_LISTING_STATE,
})

export const fetchListingsRequest = (filters) => ({
  type: FETCH_LISTINGS_REQUEST,
  payload: filters,
})

export const fetchListingsSuccess = (listings) => ({
  type: FETCH_LISTINGS_SUCCESS,
  payload: listings,
})

export const fetchListingsError = (error) => ({
  type: FETCH_LISTINGS_ERROR,
  payload: error,
})

export const fetchListingsByProvinceRequest = (params) => ({
  type: FETCH_LISTINGS_BY_PROVINCE_REQUEST,
  payload: params,
})

export const fetchListingsByProvinceSuccess = (listings) => ({
  type: FETCH_LISTINGS_BY_PROVINCE_SUCCESS,
  payload: listings,
})

export const fetchListingsByProvinceError = (error) => ({
  type: FETCH_LISTINGS_BY_PROVINCE_ERROR,
  payload: error,
})

export const uploadImagesRequest = (files) => ({
  type: 'UPLOAD_IMAGES_REQUEST',
  payload: files,
})

export const uploadImagesSuccess = (urls) => ({
  type: 'UPLOAD_IMAGES_SUCCESS',
  payload: urls,
})

export const uploadImagesError = (error) => ({
  type: 'UPLOAD_IMAGES_ERROR',
  payload: error,
})

export const fetchListingDetailsRequest = (id) => ({
  type: FETCH_LISTING_DETAILS_REQUEST,
  payload: id,
})

export const fetchListingDetailsSuccess = (data) => ({
  type: FETCH_LISTING_DETAILS_SUCCESS,
  payload: data,
})

export const fetchListingDetailsError = (error) => ({
  type: FETCH_LISTING_DETAILS_ERROR,
  payload: error,
})

export const reportListingRequest = (params) => ({
  type: REPORT_LISTING_REQUEST,
  payload: params,
})

export const reportListingSuccess = (data) => ({
  type: REPORT_LISTING_SUCCESS,
  payload: data,
})

export const reportListingError = (error) => ({
  type: REPORT_LISTING_ERROR,
  payload: error,
})

export const fetchUserListingsRequest = (status) => ({
  type: FETCH_USER_LISTINGS_REQUEST,
  payload: status,
})

export const fetchUserListingsSuccess = (listings) => ({
  type: FETCH_USER_LISTINGS_SUCCESS,
  payload: listings,
})

export const fetchUserListingsError = (error) => ({
  type: FETCH_USER_LISTINGS_ERROR,
  payload: error,
})

export const toggleListingStatusRequest = (listingId) => ({
  type: TOGGLE_LISTING_STATUS_REQUEST,
  payload: listingId,
})

export const toggleListingStatusSuccess = (response) => ({
  type: TOGGLE_LISTING_STATUS_SUCCESS,
  payload: response,
})

export const toggleListingStatusError = (error) => ({
  type: TOGGLE_LISTING_STATUS_ERROR,
  payload: error,
})

export const deleteListingRequest = (listingId) => ({
  type: DELETE_LISTING_REQUEST,
  payload: listingId,
})

export const deleteListingSuccess = (response) => ({
  type: DELETE_LISTING_SUCCESS,
  payload: response,
})

export const deleteListingtError = (error) => ({
  type: DELETE_LISTING_ERROR,
  payload: error,
})

export const renewListingRequest = (listingId) => ({
  type: RENEW_LISTING_REQUEST,
  payload: listingId,
})

export const renewListingSuccess = (response) => ({
  type: RENEW_LISTING_SUCCESS,
  payload: response,
})

export const renewListingtError = (error) => ({
  type: RENEW_LISTING_ERROR,
  payload: error,
})

export const searchListingsRequest = (params) => ({
  type: SEARCH_LISTINGS_REQUEST,
  payload: params,
})

export const searchListingsSuccess = (listings) => ({
  type: SEARCH_LISTINGS_SUCCESS,
  payload: listings,
})

export const searchListingsError = (error) => ({
  type: SEARCH_LISTINGS_ERROR,
  payload: error,
})
