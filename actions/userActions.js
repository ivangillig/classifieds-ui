// store/actions/userActions.js
import {
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_ERROR
  } from "../constants/ActionsTypes";

  export const updateUserProfileRequest = (listingId) => ({
    type: UPDATE_USER_PROFILE_REQUEST,
    payload: listingId,
  });
  
  export const updateUserProfileSuccess = (response) => ({
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: response,
  });
  
  export const updateUserProfileError = (error) => ({
    type: UPDATE_USER_PROFILE_ERROR,
    payload: error,
  });
  