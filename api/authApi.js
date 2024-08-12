// app/api/auth.js
import axios from 'axios';

export const getUserInfoApi = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/getUserInfo`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signOutRequest = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};