// app/api/auth.js
import axios from 'axios';

export const fetchUserApi = async () => {
  try {
    console.log('Calling the server...');
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`, { withCredentials: true });
    console.log('Server response received');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};