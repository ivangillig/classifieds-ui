// reducers/notificationReducer.js
import { SHOW_MESSAGE } from "../constants/ActionsTypes";

const initialState = [];

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return Array.isArray(action.payload) ? action.payload : [action.payload];
    default:
      return state;
  }
}
