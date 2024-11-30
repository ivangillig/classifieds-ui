// app/api/listingApi.js
import axios from "axios";

export const uploadImagesApi = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photos", file);
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createListing = async (payload) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/createListing`,
      payload,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchListingsApi = async (filters) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings`,
    { params: filters }
  );
  return response.data.data;
};

export const fetchListingsByProvinceApi = async ({ province, page, limit }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings`,
      {
        params: {
          province,
          page,
          limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteImagesApi = async (urls) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/deleteImages`,
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

export const fetchListingDetailsApi = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const reportListingApi = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/report`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserListingsApi = async (status) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/my-listings?status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleListingStatusApi = async (listingId) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/${listingId}/toggle-status`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
