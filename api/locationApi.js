// utils/locationApi.js
import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

// Function to fetch provinces (states) of Argentina from the API
export const fetchProvincesFromApi = async () => {
    const response = await axios.get(`${apiBaseUrl}/location/states`);
    return response.data
};

// Function to fetch cities based on the selected province from the API
export const fetchCitiesFromApi = async (subcountry) => {
    const response = await axios.get(`${apiBaseUrl}/location/cities/${subcountry}`);
    return response.data
};