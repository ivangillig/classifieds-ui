// app/reducers/authReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_FAILURE,
  UPDATE_USER_PROFILE_SUCCESS,
  RESET_PROFILE_UPDATED,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
} from '../constants/ActionsTypes'

const initialState = {
  user:
    typeof window !== 'undefined'
      ? window.localStorage.getItem('user')
        ? JSON.parse(window.localStorage.getItem('user'))
        : undefined
      : undefined,
  token:
    typeof window !== 'undefined'
      ? window.localStorage.getItem('token')
        ? window.localStorage.getItem('token')
        : undefined
      : undefined,
  loading: false,
  error: null,
  profileUpdated: false,
  emailConfirmed: false,
}

const clearLocalStorage = () => {
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('token')
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case LOGOUT_SUCCESS:
      clearLocalStorage()
      return {
        ...state,
        loading: false,
        user: undefined,
        token: undefined,
      }
    case RESET_PROFILE_UPDATED:
      return {
        ...state,
        profileUpdated: false,
      }
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      }
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case UPDATE_USER_PROFILE_SUCCESS:
      window.localStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        profileUpdated: true,
        user: action.payload,
        loading: false,
      }
    case CONFIRM_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        message: 'Confirming your email...',
        emailConfirmed: false,
      }
    case CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        emailConfirmed: true,
      }
    case CONFIRM_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
        emailConfirmed: false,
      }
    default:
      if (state.profileUpdated) {
        return {
          ...state,
          profileUpdated: false,
        }
      }
      return state
  }
}

export default authReducer
