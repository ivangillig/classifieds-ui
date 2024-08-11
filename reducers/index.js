// app/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { locationReducer } from './locationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
});

export default rootReducer;
