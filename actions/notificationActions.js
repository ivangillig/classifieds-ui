// actions/commonActions.js
import { SHOW_MESSAGE } from "../constants/ActionsTypes";

export const showMessage = (messages) => {
  return {
    type: SHOW_MESSAGE,
    payload: messages,
  };
};
