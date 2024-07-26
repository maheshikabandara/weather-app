import { createContext, useContext, useState, useEffect } from "react";
import { useLocationContext } from "./LocationContext";
import { useCurrentWeatherContext } from "./CurrentWeatherContext";
import { useHourlyWeatherContext } from "./HourlyWeatherContext";

const WmoContext = createContext();

export const WmoProvider = ({ children }) => {
    const { location } = useLocationContext();
    const { currentData, loading } = useCurrentWeatherContext();
    const { hourlyData , hLoading} = useHourlyWeatherContext();
    const [currentWeatherDescription, setCurrwntWeatherDescription] = useState('');
    const [hourlyWeatherDescription, setHourlyWeatherDescription] = useState('');

    const weatherDescriptions = {
        0: { day: "Sunny", night: "Clear" },
        1: { day: "Mainly Sunny", night: "Mainly Clear" },
        2: { day: "Partly Cloudy", night: "Partly Cloudy" },
        3: { day: "Cloudy", night: "Cloudy" },
        45: { day: "Foggy", night: "Foggy" },
        48: { day: "Rime Fog", night: "Rime Fog" },
        51: { day: "Light Drizzle", night: "Light Drizzle" },
        53: { day: "Drizzle", night: "Drizzle" },
        55: { day: "Heavy Drizzle", night: "Heavy Drizzle" },
        56: { day: "Light Freezing Drizzle", night: "Light Freezing Drizzle" },
        57: { day: "Freezing Drizzle", night: "Freezing Drizzle" },
        61: { day: "Light Rain", night: "Light Rain" },
        63: { day: "Rain", night: "Rain" },
        65: { day: "Heavy Rain", night: "Heavy Rain" },
        66: { day: "Light Freezing Rain", night: "Light Freezing Rain" },
        67: { day: "Freezing Rain", night: "Freezing Rain" },
        71: { day: "Light Snow", night: "Light Snow" },
        73: { day: "Snow", night: "Snow" },
        75: { day: "Heavy Snow", night: "Heavy Snow" },
        77: { day: "Snow Grains", night: "Snow Grains" },
        80: { day: "Light Showers", night: "Light Showers" },
        81: { day: "Showers", night: "Showers" },
        82: { day: "Heavy Showers", night: "Heavy Showers" },
        85: { day: "Light Snow Showers", night: "Light Snow Showers" },
        86: { day: "Snow Showers", night: "Snow Showers" },
        95: { day: "Thunderstorm", night: "Thunderstorm" },
        96: { day: "Light Thunderstorms With Hail", night: "Light Thunderstorms With Hail" },
        99: { day: "Thunderstorm With Hail", night: "Thunderstorm With Hail" }
    };

    const getCurrentWmoData = (currentData) => {
        if (currentData && currentData.current) {
            const weatherCodeCurrent = currentData.current.weather_code;
            const isDay = currentData.current.is_day;
            const weatherDesc = weatherDescriptions[weatherCodeCurrent];
            const description = isDay === 1 ? weatherDesc.day : weatherDesc.night;
            setCurrwntWeatherDescription(description);
        }
    };
    useEffect(() => {
        if (!loading) {
            getCurrentWmoData(currentData);
        }
    }, [currentData, loading]);


    const getHourlyWmoData = (hourlyData, currentData) => {
        if (hourlyData && hourlyData.hourly && currentData && currentData.current) {
            const weatherCodeHourly = hourlyData.hourly.weather_code;
            const isDay = currentData.current.is_day;
            const weatherDesc = weatherDescriptions[weatherCodeHourly];
            if (weatherDesc) {
                const description = isDay === 1 ? weatherDesc.day : weatherDesc.night;
                setHourlyWeatherDescription(description);
            }
        }
    };

    useEffect(() => {
        if (!hLoading && !loading){
            getHourlyWmoData(hourlyData, currentData);
        }
    }, [hourlyData, currentData, hLoading, loading]);

    return (
        <WmoContext.Provider value={{currentWeatherDescription, hourlyWeatherDescription}}>
            {children}
        </WmoContext.Provider>
    );
}

export const useWmoContext = () => useContext(WmoContext);
