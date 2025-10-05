// reducers/adminReducer.js
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

const initialState = {
  listings: [],
  totalListings: 0,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  isApproving: false,
  isChangingStatus: false,
  isDeleting: false,
  stats: {
    total: 0,
    published: 0,
    underReview: 0,
    paused: 0,
    rejected: 0,
  },
  statsLoading: false,
  statsError: null,
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_LISTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case FETCH_ADMIN_LISTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listings: action.payload.data || [],
        totalListings: action.payload.totalListings || 0,
        totalPages: action.payload.totalPages || 0,
        currentPage: action.payload.currentPage || 1,
        error: null,
      }

    case FETCH_ADMIN_LISTINGS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case APPROVE_LISTING_REQUEST:
      return {
        ...state,
        isApproving: true,
        error: null,
      }

    case APPROVE_LISTING_SUCCESS:
      return {
        ...state,
        isApproving: false,
        listings: state.listings.map((listing) =>
          listing._id === action.payload._id
            ? { ...listing, ...action.payload }
            : listing
        ),
        error: null,
      }

    case APPROVE_LISTING_ERROR:
      return {
        ...state,
        isApproving: false,
        error: action.payload,
      }

    case CHANGE_LISTING_STATUS_REQUEST:
      return {
        ...state,
        isChangingStatus: true,
        error: null,
      }

    case CHANGE_LISTING_STATUS_SUCCESS:
      return {
        ...state,
        isChangingStatus: false,
        listings: state.listings.map((listing) =>
          listing._id === action.payload._id
            ? { ...listing, ...action.payload }
            : listing
        ),
        error: null,
      }

    case CHANGE_LISTING_STATUS_ERROR:
      return {
        ...state,
        isChangingStatus: false,
        error: action.payload,
      }

    case DELETE_ADMIN_LISTING_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: null,
      }

    case DELETE_ADMIN_LISTING_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        listings: state.listings.filter(
          (listing) => listing._id !== action.payload
        ),
        totalListings: Math.max(0, state.totalListings - 1),
        error: null,
      }

    case DELETE_ADMIN_LISTING_ERROR:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
      }

    // Fetch Admin Stats
    case FETCH_ADMIN_STATS_REQUEST:
      return {
        ...state,
        statsLoading: true,
        statsError: null,
      }

    case FETCH_ADMIN_STATS_SUCCESS:
      return {
        ...state,
        statsLoading: false,
        stats: action.payload,
        statsError: null,
      }

    case FETCH_ADMIN_STATS_ERROR:
      return {
        ...state,
        statsLoading: false,
        statsError: action.payload,
      }

    default:
      return state
  }
}

export default adminReducer
