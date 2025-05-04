import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Title, Text, Image } from "@mantine/core";
import { fetchForecastInCoords, fetchWeatherInCity } from "../server/dashboard/weatherCalls";
import { fetchFavorites } from "../server/dashboard/favorites";
import { supabase } from "../supabaseClient";
import { Weather } from "../dashboard/components/Favorites";
import Forecast from "./components/Forecast";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteIcon from '@mui/icons-material/Favorite';

const WeatherDisplay = () => {
    const { city } = useParams();
    const [weather, setWeather] = useState<Weather | null>(null);
    const [forecast, setForecast] = useState<any>(null);
    const [favorites, setFavorites] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadWeather = async () => {
            if (city) {
                const weatherData = await fetchWeatherInCity(city, 'metric');
                setWeather({
                    description: weatherData.weather[0].description,
                    icon: weatherData.weather[0].icon,
                    temp: weatherData.main.temp,
                    tempMin: weatherData.main.temp_min,
                    tempMax: weatherData.main.temp_max,
                    humidity: weatherData.main.humidity,
                });
            }
        };

        loadWeather();
    }, [city]);

    useEffect(() => {
        const loadForecast = async () => {
            if (city) {
                const forecastData = await fetchForecastInCoords(city, 'metric');
                setForecast(forecastData);
            }
        };

        loadForecast();
    }, [weather]);

    useEffect(() => {
        const loadFavorites = async () => {
            const favoritesData = await fetchFavorites();
            setFavorites(favoritesData);
        };

        loadFavorites();
    }, []);

    const toggleFavorite = async () => {
        if (!city) return;

        const isFavorite = favorites.some((favorite) => favorite.city_name === city);

        if (isFavorite) {
            const { error } = await supabase
                .from("FavoriteCities")
                .delete()
                .eq("city_name", city)
                .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

            if (error) {
                alert(error.message);
                return;
            }

            setFavorites((prev) => prev.filter((favorite) => favorite.city_name !== city));
        } else {
            if (favorites.length >= 3) {
                alert("You can only have up to 3 favorite cities.");
                return;
            }

            const { error } = await supabase
                .from("FavoriteCities")
                .insert({
                    city_name: city,
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                });

            if (error) {
                alert(error.message);
                return;
            }

            setFavorites((prev) => [...prev, { city_name: city }]);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
            <ArrowBackIosNewIcon style={{ cursor: 'pointer', height: '80px', width: '80px', position: 'absolute', left: 0, top: 0 }} onClick={() => { navigate(-1) }} />
            {weather ? (
                <Card shadow="sm" withBorder style={{ width: '300px', padding: '16px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        <Title
                            order={3}
                            style={{
                                marginBottom: '0',
                                textAlign: 'center',
                            }}
                        >
                            Right now
                        </Title>
                        <FavoriteIcon
                            onClick={toggleFavorite}
                            style={{
                                cursor: 'pointer',
                                color: favorites.some((favorite) => favorite.city_name === city) ? 'red' : 'gray',
                                position: 'absolute',
                                right: 0,
                            }}
                        />
                    </div>
                    <Text size="lg" style={{ marginBottom: '12px', textAlign: 'center' }}>
                        {city}
                    </Text>

                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <Image
                            src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                            alt={weather.description}
                            width={100}
                            height={100}
                            fit="contain"
                        />
                    </div>

                    <Text size="sm" style={{ marginBottom: '8px' }}>
                        <strong>Description:</strong> {weather.description}
                    </Text>
                    <Text size="sm" style={{ marginBottom: '8px' }}>
                        <strong>Temperature:</strong> {weather.temp}°C
                    </Text>
                    <Text size="sm" style={{ marginBottom: '8px' }}>
                        <strong>Min Temperature:</strong> {weather.tempMin}°C
                    </Text>
                    <Text size="sm" style={{ marginBottom: '8px' }}>
                        <strong>Max Temperature:</strong> {weather.tempMax}°C
                    </Text>
                    <Text size="sm">
                        <strong>Humidity:</strong> {weather.humidity}%
                    </Text>
                </Card>
            ) : (
                <div style={{ textAlign: 'center' }}>Loading weather data...</div>
            )}
            {
                forecast && (
                    <div style={{ paddingTop: '20px', width: '100%' }}>
                        <Forecast forecast={forecast} />
                    </div>)
            }
        </div>
    );
};

export default WeatherDisplay;