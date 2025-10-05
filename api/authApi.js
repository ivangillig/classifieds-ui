// app/api/auth.js
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig()
const { API_BASE_URL } = publicRuntimeConfig

export const getUserInfoApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/getUserInfo`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signOutRequest = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const confirmEmailApi = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/confirm-email/${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};