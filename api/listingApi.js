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

export const fetchListingsByProvinceApi = async (province) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings`,
      { params: { province } }
    );
    return response.data.data;
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
