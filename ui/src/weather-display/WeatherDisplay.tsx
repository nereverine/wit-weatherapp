import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Title, Text, Image } from "@mantine/core";
import { fetchForecastInCoords, fetchWeatherInCity } from "../server/dashboard/weatherCalls";
import { Weather } from "../dashboard/components/Favorites";
import Forecast from "./components/Forecast";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const WeatherDisplay = () => {
    const { city } = useParams();
    const [weather, setWeather] = useState<Weather | null>(null);
    const [forecast, setForecast] = useState<any>(null);
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
                console.log("typeof forecastData", typeof forecastData)
                console.log("forecastData", forecastData)
                setForecast(forecastData);
            }
        };

        loadForecast();
    }, [weather]);


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
            <ArrowBackIosNewIcon style={{ cursor: 'pointer', height: '80px', width: '80px', position: 'absolute', left: 0, top: 0 }} onClick={() => { navigate(-1) }} />
            {weather ? (
                <Card shadow="sm" withBorder style={{ width: '300px', padding: '16px' }}>
                    <Title order={3} style={{ marginBottom: '16px', textAlign: 'center' }}>
                        Right now
                    </Title>

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
            {forecast && (
                <div style={{ paddingTop: '20px', width: '100%' }}>
                    <Forecast forecast={forecast} />
                </div>)}
        </div>
    );
};

export default WeatherDisplay;