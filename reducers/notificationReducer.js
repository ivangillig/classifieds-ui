// reducers/notificationReducer.js
import { SHOW_MESSAGE, CLEAR_MESSAGES } from "../constants/ActionsTypes";

const initialState = [];

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return Array.isArray(action.payload) ? action.payload : [action.payload];
    case CLEAR_MESSAGES:
      return [];
    default:
      return state;
  }
}
