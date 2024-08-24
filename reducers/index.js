// app/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { locationReducer } from "./locationReducer";
import notificationReducer from "./notificationReducer";
import listingReducer from "./listingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  notifications: notificationReducer,
  listing: listingReducer
});

export default rootReducer;
