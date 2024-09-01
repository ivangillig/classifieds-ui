import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import configureAxios from '@/utils/axiosConfig';

const sagaMiddleware = createSagaMiddleware();

// Función para crear el store
const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
      }).concat(sagaMiddleware),
  });

  configureAxios(store); // Configure Axios on the store

  sagaMiddleware.run(rootSaga);

  return store;
};

// Crear el wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
