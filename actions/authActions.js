// app/actions/authActions.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE
} from '../constants/ActionsTypes';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export const getUserInfoRequest = (token) => ({
  type: GET_USER_INFO_REQUEST,
  token,
});

export const getUserInfoSuccess = (user) => ({
  type: GET_USER_INFO_SUCCESS,
  user,
});

export const getUserInfoFailure = (error) => ({
  type: GET_USER_INFO_FAILURE,
  error,
});

export const confirmEmailRequest = (token) => ({
  type: CONFIRM_EMAIL_REQUEST,
  payload: token,
});

export const confirmEmailSuccess = (message) => ({
  type: CONFIRM_EMAIL_SUCCESS,
  payload: message,
});

export const confirmEmailFailure = (error) => ({
  type: CONFIRM_EMAIL_FAILURE,
  payload: error,
});
