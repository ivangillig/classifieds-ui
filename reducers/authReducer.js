// app/reducers/authReducer.js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/authActions";

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
    default:
      return state;
  }
};

export default authReducer;
