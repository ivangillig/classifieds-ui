// app/api/auth.js
import axios from 'axios';

export const createListing = async (payload) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ads/createListing`, payload, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};