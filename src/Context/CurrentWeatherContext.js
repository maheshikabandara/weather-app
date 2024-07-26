import { createContext, useContext, useState, useEffect } from "react";
import { useLocationContext } from "./LocationContext";

const CurrentWeatherContext = createContext();

export const CurrentWeatherProvider = ({ children }) => {
    const { location } = useLocationContext();
    const [currentData, setCurrentData] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCurrentData = (latitude, longitude) => {
        try {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,rain,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`)
                .then((response) => response.json())
                .then((data) => { setCurrentData(data); setLoading(false) })
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (location.latitude && location.longitude) {
            fetchCurrentData(location.latitude, location.longitude);
        }
    }, [location]);

    return (
        <CurrentWeatherContext.Provider value={{ currentData, loading}}>
            {children}
        </CurrentWeatherContext.Provider>
    )
}

export const useCurrentWeatherContext = () => useContext(CurrentWeatherContext);