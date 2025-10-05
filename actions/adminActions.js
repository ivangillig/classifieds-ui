// actions/adminActions.js
import {
  FETCH_ADMIN_LISTINGS_REQUEST,
  FETCH_ADMIN_LISTINGS_SUCCESS,
  FETCH_ADMIN_LISTINGS_ERROR,
  APPROVE_LISTING_REQUEST,
  APPROVE_LISTING_SUCCESS,
  APPROVE_LISTING_ERROR,
  CHANGE_LISTING_STATUS_REQUEST,
  CHANGE_LISTING_STATUS_SUCCESS,
  CHANGE_LISTING_STATUS_ERROR,
  DELETE_ADMIN_LISTING_REQUEST,
  DELETE_ADMIN_LISTING_SUCCESS,
  DELETE_ADMIN_LISTING_ERROR,
  FETCH_ADMIN_STATS_REQUEST,
  FETCH_ADMIN_STATS_SUCCESS,
  FETCH_ADMIN_STATS_ERROR,
} from '../constants/ActionsTypes'

// Fetch Admin Listings
export const fetchAdminListingsRequest = (params) => ({
  type: FETCH_ADMIN_LISTINGS_REQUEST,
  payload: params,
})

export const fetchAdminListingsSuccess = (data) => ({
  type: FETCH_ADMIN_LISTINGS_SUCCESS,
  payload: data,
})

export const fetchAdminListingsError = (error) => ({
  type: FETCH_ADMIN_LISTINGS_ERROR,
  payload: error,
})

// Approve Listing
export const approveListingRequest = (listingId) => ({
  type: APPROVE_LISTING_REQUEST,
  payload: listingId,
})

export const approveListingSuccess = (listing) => ({
  type: APPROVE_LISTING_SUCCESS,
  payload: listing,
})

export const approveListingError = (error) => ({
  type: APPROVE_LISTING_ERROR,
  payload: error,
})

// Change Listing Status (unified action)
export const changeListingStatusRequest = (
  listingId,
  newStatus,
  reason = null
) => ({
  type: CHANGE_LISTING_STATUS_REQUEST,
  payload: { listingId, newStatus, reason },
})

export const changeListingStatusSuccess = (listing) => ({
  type: CHANGE_LISTING_STATUS_SUCCESS,
  payload: listing,
})

export const changeListingStatusError = (error) => ({
  type: CHANGE_LISTING_STATUS_ERROR,
  payload: error,
})

export const deleteAdminListingRequest = (listingId) => ({
  type: DELETE_ADMIN_LISTING_REQUEST,
  payload: listingId,
})

export const deleteAdminListingSuccess = (listingId) => ({
  type: DELETE_ADMIN_LISTING_SUCCESS,
  payload: listingId,
})

export const deleteAdminListingError = (error) => ({
  type: DELETE_ADMIN_LISTING_ERROR,
  payload: error,
})

export const fetchAdminStatsRequest = () => ({
  type: FETCH_ADMIN_STATS_REQUEST,
})

export const fetchAdminStatsSuccess = (data) => ({
  type: FETCH_ADMIN_STATS_SUCCESS,
  payload: data,
})

export const fetchAdminStatsError = (error) => ({
  type: FETCH_ADMIN_STATS_ERROR,
  payload: error,
})
