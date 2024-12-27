// app/api/listingApi.js
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const { BASE_URL } = publicRuntimeConfig;

export const updateUserProfileApi = async (payload) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/user`, payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
