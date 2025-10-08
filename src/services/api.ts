import axios from 'axios';
import { ApiResponse, Asset, AssetResult } from '../types/asset';

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

export const validateToken = async (username: string): Promise<ApiResponse<string>> => {
  try {
    const response = await apiClient.get<ApiResponse<string>>(`/validatetoken`);
    console.log("response", response)
    return response.data;
  } catch (error) {
    console.error("Error fetching recent deals:", error);
    throw error;
  }
};

export const getRecentDeals = async (username: string): Promise<ApiResponse<Asset[]>> => {
  const customer = "Investor Demo";

  try {
    const response = await apiClient.get<ApiResponse<Asset[]>>(`/getrecentdeals/${username}/${customer}`);
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

export const fetchAndMapAssetData = async (enquiryId: string): Promise<AssetResult> => {
  if (!enquiryId) {
    throw new Error("Enquiry ID must be provided.");
  }

  const url = `${API_BASE_URL}/getapienquiry?enquiryId=${enquiryId}`;

  try {
    const response = await apiClient.get<ApiResponse<AssetResult>>(url);

    if (response.data.status !== 200) {
      throw new Error(`API returned non-200 status: ${response.data.status}`);
    }

    return response.data.result;
  } catch (err) {
    console.error("API Fetch Error:", err);
    throw new Error("Failed to load asset data from API.");
  }
};
