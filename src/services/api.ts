import axios from 'axios';
import { ApiResponse } from '../types/asset';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BEARER_TOKEN = import.meta.env.VITE_API_BEARER_TOKEN;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export const getRecentDeals = async (username: string): Promise<ApiResponse> => {
  const customer = "Investor Demo";

  try {
    const response = await apiClient.get<ApiResponse>(`/getrecentdeals/${username}/${customer}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent deals:", error);
    throw error;
  }
};

export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  if (!GOOGLE_MAPS_API_KEY) {
    console.error("Google Maps API Key is missing.");
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK' && response.data.results[0]) {
      const location = response.data.results[0].geometry.location;
      return location;
    }
    return null;
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};