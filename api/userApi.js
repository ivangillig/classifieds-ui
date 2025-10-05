// app/api/listingApi.js
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const { API_BASE_URL } = publicRuntimeConfig;

export const updateUserProfileApi = async (payload) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/user`, payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
