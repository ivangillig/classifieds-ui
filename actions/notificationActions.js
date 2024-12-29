// actions/commonActions.js
import { SHOW_MESSAGE, CLEAR_MESSAGES } from "../constants/ActionsTypes";

export const showMessage = (messages) => {
  return {
    type: SHOW_MESSAGE,
    payload: messages,
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
