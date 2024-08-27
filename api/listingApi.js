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

export const fetchListingsApi = async (filters) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ads/listings`, { params: filters });
  return response.data.data;
};