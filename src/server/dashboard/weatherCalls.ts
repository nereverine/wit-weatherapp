import axios from 'axios';
import dayjs from 'dayjs';
import { supabase } from '../../supabaseClient';

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY as string;
const API_URL = import.meta.env.VITE_OPENWEATHER_URL as string;
const FORECAST_URL = import.meta.env.VITE_OPENWEATHER_FORECAST_URL as string;

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
    } catch (error: any) {
        alert(error.response.data.message);
        throw error;
    }
};

export const fetchForecastInCoords = async (city: string, unit: 'metric' | 'imperial') => {
    try {
        const response = await axios.get(FORECAST_URL, {
            params: {
                q: city,
                units: unit,
                appid: API_KEY,
            },
        });

        const rawList = response.data.list;

        const grouped: Record<string, any[]> = {};

        rawList.forEach((entry: any) => {
            const dateKey = dayjs(entry.dt_txt).format('YYYY-MM-DD');
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(entry);
        });


        const days = Object.entries(grouped).slice(0, 5).map(([date, entries]: [string, any[]]) => ({
            date,
            entries,
        }));

        return days;
    } catch (error: any) {
        alert(error);
        throw error;
    }
};

export const fetchUnit = async () => {

    const { data, error } = await supabase
        .from("Profiles")
        .select("temp_unit")
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
        .single();

    if (!error && data?.temp_unit)
        return data.temp_unit;
};
