// app/api/auth.js
import axios from 'axios';

export const signInRequest = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};