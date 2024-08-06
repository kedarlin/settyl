import axios from 'axios';


export const fetchCoordinates = async (address) => {
  const MAPTILER_API_URL = 'https://api.maptiler.com/geocoding/';
  const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY; // Ensure you have your API key in your environment variables
  // console.log(MAPTILER_API_KEY);
  try {
    if (!MAPTILER_API_KEY) {
      throw new Error('MAPTILER_API_KEY is not defined');
    }

    const apiUrl = `${MAPTILER_API_URL}${encodeURIComponent(address)}.json?key=${MAPTILER_API_KEY}`;
    // console.log(`Fetching coordinates from: ${apiUrl}`); // Log the URL for debugging

    const response = await axios.get(apiUrl);
    // console.log(response); // Log the response for debugging

    if (response.data.features.length === 0) {
      throw new Error('City not found');
    }

    const [lon, lat] = response.data.features[0].geometry.coordinates;
    return { lat, lon };
  } catch (error) {
    throw new Error(`Error fetching coordinates: ${error.message}`);
  }
};