// utils/axiosConfig.js
import Axios from 'axios';
// import NProgress from 'nprogress';
import getConfig from 'next/config';
// import { showLoader, hideLoader, userSignOut, showMessage } from '../actions';

export default function configureAxios(store) {
  const { publicRuntimeConfig } = getConfig();

  // Basic Axios configuration
  Axios.defaults.baseURL = publicRuntimeConfig.apiUrl;
  Axios.defaults.timeout = 60000;

  // Request interceptor
  Axios.interceptors.request.use(
    (config) => {
      // Show progress and loader before sending the request
    //   NProgress.start();
    //   store.dispatch(showLoader());

      // Add authorization token if available in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      // Handle request error
    //   store.dispatch(hideLoader());
    //   NProgress.done();
      return Promise.reject(error);
    }
  );

  // Response interceptor
  Axios.interceptors.response.use(
    (response) => {
      // Hide loader and progress after receiving the response
    //   store.dispatch(hideLoader());
    //   setTimeout(() => {
    //     NProgress.done();
    //   }, 1000);
    return response;
    },
    (error) => {
      // Handle response error
        //   store.dispatch(hideLoader());
        //   setTimeout(() => {
        // NProgress.done();
        //   }, 1000);

      if (error.response) {
        // switch (error.response.status) {
        //   case 401:
        //     // If unauthorized, sign the user out
        //     store.dispatch(userSignOut());
        //     break;
        //   case 404:
        //     store.dispatch(showMessage({
        //       type: 'error',
        //       message: 'Error 404',
        //       description: error.response.data.message || 'Resource not found',
        //     }));
        //     break;
        //   case 403:
        //     store.dispatch(showMessage({
        //       type: 'error',
        //       message: 'Access Denied',
        //       description: 'You are not authorized to access this resource',
        //     }));
        //     break;
        //   default:
        //     store.dispatch(showMessage({
        //       type: 'error',
        //       message: 'Error',
        //       description: 'An error occurred while communicating with the server',
        //     }));
        //     break;
        // }
      } else {
        // store.dispatch(showMessage({
        //   type: 'error',
        //   message: 'Network Error',
        //   description: 'An error occurred while communicating with the server',
        // }));
      }

      return Promise.reject(error);
    }
  );
}
