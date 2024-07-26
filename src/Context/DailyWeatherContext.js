import { createContext, useContext, useState, useEffect } from "react";
import { useLocationContext } from "./LocationContext";

const DailyWeatherContext = createContext();

export const DailyWeatherProvider = ({children}) =>{
    const {location}= useLocationContext();
    const [dailyData, setDailyData] = useState('');
    const [uvIndex, setUvIndex] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');

    const fetchDailyData = (latitude, longitude) => {
        try {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,uv_index_max,uv_index_clear_sky_max&timezone=auto`)
                .then((response) => response.json())
                .then((data) => { 
                    setDailyData(data);
                    if(data.daily && data.daily.time && data.daily.time.length>0){
                        setUvIndex(data.daily.uv_index_max[0]);
                        setSunrise(data.daily.sunrise[0]);
                        setSunset(data.daily.sunset[0]);
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (location.latitude && location.longitude) {
            fetchDailyData(location.latitude, location.longitude);
        }
    }, [location]);

    return (
        <DailyWeatherContext.Provider value={{dailyData,uvIndex,sunrise,sunset}}>
            {children}
        </DailyWeatherContext.Provider>
    )
}

export const useDailyWeatherContext = () => useContext(DailyWeatherContext);