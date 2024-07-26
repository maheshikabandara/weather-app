import { createContext, useContext, useState, useEffect } from "react";
import { useLocationContext } from "./LocationContext";

const HourlyWeatherContext = createContext();

export const HourlyWeatherProvider = ({ children }) => {
    const { location } = useLocationContext();
    const [hourlyData, setHourlyData] = useState('');
    const [hLoading, setLoading] = useState(true);
    const [visibility, setVisibility] = useState('');

    const fetchHourlyData = (latitude, longitude) => {
        try {
            
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,precipitation,rain,weather_code,visibility&timezone=auto`)
                .then((response) => response.json())
                .then((data) => { setHourlyData(data);
                    if(data.hourly && data.hourly.time && data.hourly.time.length>0){
                        const wholenumer = Math.floor(data.hourly.visibility[0]/1609.34);
                        setVisibility(wholenumer);
                    }
                    setLoading(false) })
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        if (location.latitude && location.longitude) {
            fetchHourlyData(location.latitude, location.longitude);
        }
    }, [location]);


    return (
        <HourlyWeatherContext.Provider value={{ hourlyData, hLoading, visibility}}>
            {children}
        </HourlyWeatherContext.Provider>
    )
}

export const useHourlyWeatherContext = () => useContext(HourlyWeatherContext);