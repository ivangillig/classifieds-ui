// app/api/listingApi.js
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const { BASE_URL } = publicRuntimeConfig;

export const uploadImagesApi = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photos", file);
    });

    const response = await axios.post(`${BASE_URL}/listings/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createListing = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/listings/createListing`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchListingsApi = async (filters) => {
  const response = await axios.get(`${BASE_URL}/listings`, { params: filters });
  return response.data.data;
};

export const fetchListingsByProvinceApi = async ({ province, page, limit }) => {
  try {
    const response = await axios.get(`${BASE_URL}/listings`, {
      params: {
        province,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteImagesApi = async (urls) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/listings/deleteImages`,
      { urls },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editListingApi = async ({ id, ...payload }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/listings/${id}`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const fetchListingDetailsApi = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/listings/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const reportListingApi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/listings/report`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserListingsApi = async (status) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/listings/my-listings?status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleListingStatusApi = async (listingId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/listings/${listingId}/toggle-status`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteListingApi = async (listingId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/listings/${listingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const renewListingApi = async (listingId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/listings/${listingId}/renewListing`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
