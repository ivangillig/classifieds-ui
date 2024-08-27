// store/reducers/listingReducer.js
import {
  CREATE_LISTING_REQUEST,
  CREATE_LISTING_SUCCESS,
  CREATE_LISTING_ERROR,
  FETCH_LISTINGS_REQUEST,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_ERROR,
  CLEAR_LISTING_STATE,
} from "../constants/ActionsTypes";

const initialState = {
  listings: [],
  isLoading: false,
  error: null,
  listingCreated: false,
};

export default function listingReducer(state = initialState, action) {
  switch (action.type) {
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
    case CLEAR_LISTING_STATE:
      return initialState;
    default:
      return state;
  }
}
