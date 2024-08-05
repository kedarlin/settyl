import axios from 'axios';
import { errorHandler } from '../utils/error.js';

const MAPTILER_API_URL = 'https://api.maptiler.com/geocoding/';
const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY; // Ensure you have your API key in your environment variables

export const fetchCoordinates = async (address) => {
  try {
    const response = await axios.get(`${MAPTILER_API_URL}${address}.json`, {
      params: {
        key: MAPTILER_API_KEY,
        limit: 1
      }
    });

    if (response.data.features.length === 0) {
      throw new Error('City not found');
    }

    const [lon, lat] = response.data.features[0].geometry.coordinates;
    return { lat, lon };
  } catch (error) {
    throw new Error(`Error fetching coordinates: ${error.message}`);
  }
};