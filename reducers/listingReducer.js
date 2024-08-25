// store/reducers/listingReducer.js
import {
    CREATE_LISTING_REQUEST,
    CREATE_LISTING_SUCCESS,
    CREATE_LISTING_ERROR,
    CLEAR_LISTING_STATE,
} from '../constants/ActionsTypes';

const initialState = {
    isLoading: false,
    listingCreated: false,
    error: null,
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
        case CLEAR_LISTING_STATE:
            return initialState;
        default:
            return state;
    }
}
