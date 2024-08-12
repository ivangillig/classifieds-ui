// app/reducers/authReducer.js
import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
   LOGIN_FAILURE,
   LOGOUT_SUCCESS,
   GET_USER_INFO_SUCCESS,
   GET_USER_INFO_REQUEST,
   GET_USER_INFO_FAILURE
} from "../constants/ActionsTypes";

const initialState = {
  user: (typeof window !== 'undefined') ? ((window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')) : undefined) : undefined,
  token: (typeof window !== 'undefined') ? ((window.localStorage.getItem('token')) ? window.localStorage.getItem('token') : undefined) : undefined,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: undefined,
        token: undefined
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
