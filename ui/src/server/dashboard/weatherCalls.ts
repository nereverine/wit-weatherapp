import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY as string;
const API_URL = import.meta.env.VITE_OPENWEATHER_URL as string;

export const fetchWeatherInCity = async (city: string, unit: 'metric' | 'imperial') => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: city,
                units: unit,
                appid: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};