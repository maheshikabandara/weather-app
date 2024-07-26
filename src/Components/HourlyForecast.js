import React, { useEffect, useState } from 'react';
import { useHourlyWeatherContext } from '../Context/HourlyWeatherContext';
import { useWmoContext } from '../Context/WmoContext';

function HourlyForecast() {
    const { hourlyData, hLoading, visibility } = useHourlyWeatherContext();
    const [formattedData, setFormattedData] = useState([]);
    const [bgColor, setBgColor] = useState('');
    const { hourlyWeatherDescription } = useWmoContext();

    const getTime = () => {
        const now = new Date();
        const hour24 = now.getHours();

        if (now.getHours() < 12) {
            setBgColor('#FFE4E4');
          } else if (now.getHours() < 17) {
              setBgColor('#E0FAFF');
          } else if (now.getHours() < 21) {
              setBgColor('#E9E9FF');
          } else {
            setBgColor('#D3F2FF');
      
          }
    };

    useEffect(() => {
        getTime();
    }, []);

    useEffect(() => {
        if (hourlyData && hourlyData.hourly && hourlyData.hourly.time && hourlyData.hourly.time.length > 0) {
            const currentHour = new Date().getHours()+1;
            
            // Get index of the current hour
            const currentIndex = hourlyData.hourly.time.findIndex(time => new Date(time).getHours() === currentHour);
            
            if (currentIndex !== -1) {
                // Slice the data for the next 5 hours including the current hour
                const next5HoursData = hourlyData.hourly.time.slice(currentIndex, currentIndex + 5);
                
                const formattedItems = next5HoursData.map((time, index) => ({
                    time: new Date(time).toLocaleTimeString([], { hour: '2-digit' }),
                    temperature: hourlyData.hourly.temperature_2m[currentIndex + index],
                    precipitation: hourlyData.hourly.precipitation[currentIndex + index],
                    // Assuming weather codes could be handled later
                    // weather_codes: hourlyWeatherDescription[currentIndex + index],
                }));

                setFormattedData(formattedItems);
            }
        }
    }, [hourlyData]);

    if (hLoading) {
        return <p>Loading Hourly Data...</p>;
    }

    if (!hourlyData || !hourlyData.hourly || !hourlyData.hourly.time || hourlyData.hourly.time.length === 0) {
        return <p>No Hourly data available</p>;
    }

    return (
        <div className='hf-container' style={{backgroundColor:bgColor}}>
            <div className='h-title-container'>
                <p className='h-title'>Hourly Forecast</p>
            </div>
            <div className='hourly-forecast'>
                {formattedData.map((item, index) => (
                    <div key={index} className='hourly-item'  >
                        <p className='hf-time'>{item.time}</p>
                        {/* <p>{item.weather_codes}</p> */}
                        <p className='hf-temperature'>{item.temperature}°C</p>
                        <p className='hf-precipitation'>{item.precipitation}mm</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HourlyForecast;
