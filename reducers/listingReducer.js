// store/reducers/listingReducer.js
import {
    CREATE_LISTING_REQUEST,
    CREATE_LISTING_SUCCESS,
    CREATE_LISTING_ERROR,
} from '../constants/ActionsTypes';

const initialState = {
    isLoading: false,
    listing: null,
    error: null,
    listingCreatedSuccessfully: false
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
                listing: action.payload,
                listingCreatedSuccessfully: true
            };
        case CREATE_LISTING_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
