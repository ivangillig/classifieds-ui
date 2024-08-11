// app/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './auth';
import { locationReducer } from './locationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
});

export default rootReducer;
