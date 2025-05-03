import { Accordion, Card, Divider, Group, Stack, Text } from "@mantine/core";
import lodash from "lodash";

const Forecast = ({ forecast }: any) => {

    return (
        <Accordion variant="separated" multiple={false} chevronPosition="left" style={{ width: '100%' }}>
            {forecast.map((day: any) => (
                <Accordion.Item value={day.date} key={day.date}>
                    <Accordion.Control>
                        <Group justify="space-between" align="center">
                            <Text fw={600}>{new Date(day.date).toDateString()}</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack>
                            {day.entries.map((entry: any) => (
                                <Card key={entry.dt} shadow="xs" withBorder padding="sm">
                                    <Group justify="space-between">
                                        <Text size="sm">
                                            {new Date(entry.dt_txt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Text>
                                        <Group>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                                                alt={entry.weather[0].description}
                                                width={40}
                                                height={40}
                                            />
                                            <Text>{Math.round(entry.main.temp)}°C</Text>
                                        </Group>
                                    </Group>
                                    <Divider my="xs" />
                                    <Text size="xs">Feels like: {Math.round(entry.main.feels_like)}°C</Text>
                                    <Text size="xs">Humidity: {entry.main.humidity}%</Text>
                                    <Text size="xs">Wind: {entry.wind.speed} m/s</Text>
                                    {entry.rain?.['3h'] && (
                                        <Text size="xs">Rain: {entry.rain['3h']} mm</Text>
                                    )}
                                    <Text size="xs" c="dimmed">{lodash.capitalize(entry.weather[0].description)}</Text>
                                </Card>
                            ))}
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

export default Forecast;