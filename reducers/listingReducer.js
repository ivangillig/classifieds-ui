// store/reducers/listingReducer.js
import {
  CREATE_LISTING_REQUEST,
  CREATE_LISTING_SUCCESS,
  CREATE_LISTING_ERROR,
  FETCH_LISTINGS_REQUEST,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_ERROR,
  CLEAR_LISTING_STATE,
  FETCH_LISTINGS_BY_PROVINCE_SUCCESS,
  FETCH_LISTINGS_BY_PROVINCE_ERROR,
  FETCH_LISTINGS_BY_PROVINCE_REQUEST,
  FETCH_LISTING_DETAILS_REQUEST,
  FETCH_LISTING_DETAILS_SUCCESS,
  FETCH_LISTING_DETAILS_ERROR,
} from "../constants/ActionsTypes";

const initialState = {
  listings: [],
  listingDetails: null,
  pagination: null,
  isLoading: false,
  error: null,
  listingCreated: false,
};

export default function listingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LISTING_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_LISTING_DETAILS_SUCCESS:
      return {
        ...state,
        listingDetails: action.payload,
        isLoading: false,
      };
    case FETCH_LISTING_DETAILS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case CREATE_LISTING_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listingCreated: true,
      };
    case CREATE_LISTING_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_LISTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        listings: action.payload,
        isLoading: false,
      };
    case FETCH_LISTINGS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case FETCH_LISTINGS_BY_PROVINCE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_LISTINGS_BY_PROVINCE_SUCCESS:
      return {
        ...state,
        listings: action.payload.data,
        pagination: action.payload.meta,
        isLoading: false,
      };
    case FETCH_LISTINGS_BY_PROVINCE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case CLEAR_LISTING_STATE:
      return initialState;
    default:
      return state;
  }
}
