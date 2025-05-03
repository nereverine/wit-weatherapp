import { Card, CardSection, Container, Grid, Text, Title, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchFavorites } from "../../server/dashboard/favorites";
import { fetchWeatherInCity } from "../../server/dashboard/weatherCalls";
import lodash from "lodash";

export type Favorite = {
    id: number;
    user_id: string;
    city_name: string;
};

export type Weather = {
    description: string;
    icon: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
};

const Favorites = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [weatherData, setWeatherData] = useState<{ [key: string]: Weather }>({});

    useEffect(() => {
        const loadFavorites = async () => {
            const result = await fetchFavorites();
            setFavorites(result);

            const weatherPromises = result.slice(0, 3).map(async (favorite: Favorite) => {
                const weather = await fetchWeatherInCity(favorite.city_name, 'metric');
                return {
                    city: favorite.city_name,
                    weather: {
                        description: lodash.capitalize(weather.weather[0].description),
                        icon: weather.weather[0].icon,
                        temp: weather.main.temp,
                        tempMin: weather.main.temp_min,
                        tempMax: weather.main.temp_max,
                        humidity: weather.main.humidity,
                    },
                };
            });

            const weatherResults = await Promise.all(weatherPromises);
            const weatherMap = weatherResults.reduce((acc, curr) => {
                acc[curr.city] = curr.weather;
                return acc;
            }, {} as { [key: string]: Weather });

            setWeatherData(weatherMap);
        };

        loadFavorites();
    }, []);

    return (
        <Container>
            <Grid gutter="md" justify="center" align="center">
                {favorites.slice(0, 3).map((favorite) => (
                    <Grid.Col span="content" key={favorite.id}>
                        <Card shadow="sm" withBorder style={{ width: '250px' }}>
                            <CardSection style={{ padding: '16px', textAlign: 'center' }}>
                                <Title order={3}>{favorite.city_name}</Title>
                            </CardSection>

                            <CardSection style={{ textAlign: 'center', padding: '16px' }}>
                                {weatherData[favorite.city_name]?.icon && (
                                    <Image
                                        src={`http://openweathermap.org/img/wn/${weatherData[favorite.city_name]?.icon}@2x.png`}
                                        alt={weatherData[favorite.city_name]?.description}
                                        width={80}
                                        height={80}
                                        fit="contain"
                                    />
                                )}
                            </CardSection>

                            <CardSection style={{ padding: '16px' }}>
                                <Text size="sm" color="dimmed">
                                    {weatherData[favorite.city_name]?.description}
                                </Text>
                                <Text size="sm">
                                    Temp: {weatherData[favorite.city_name]?.temp}°C
                                </Text>
                                <Text size="sm">
                                    Humidity: {weatherData[favorite.city_name]?.humidity}%
                                </Text>
                            </CardSection>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
};

export default Favorites;