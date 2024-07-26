import React, { useEffect, useState } from 'react';
import { useHourlyWeatherContext } from '../Context/HourlyWeatherContext';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ChanceOfRain() {
    const { hourlyData, loading } = useHourlyWeatherContext();
    const [formattedData, setFormattedData] = useState([]);
    const [bgColor, setBgColor] = useState('');
    const [barColor, setBarColor] = useState('');

    useEffect(() => {
        const getTime = () => {
            const now = new Date();
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

        getTime();
    }, []);

    useEffect(() => {
        if (hourlyData && hourlyData.hourly && hourlyData.hourly.time && hourlyData.hourly.time.length > 0) {
            const currentTime = new Date().getHours() + 1;
            const next5HoursData = hourlyData.hourly.time
                .slice(currentTime, currentTime + 5)
                .map((time, index) => ({
                    time: new Date(time).toLocaleTimeString([], { hour: '2-digit' }),
                    precipitations: hourlyData.hourly.precipitation_probability[currentTime + index],
                }));

            setFormattedData(next5HoursData);
        }
    }, [hourlyData]);

    if (loading) {
        console.log('Precipitation Data is Loading...');
    }

    if (!hourlyData || !hourlyData.hourly || !hourlyData.hourly.time || hourlyData.hourly.time.length === 0) {
        console.log('No precipitation data available');
        return null;
    }

    return (
        <div className='cor-container' style={{backgroundColor:bgColor}}>
            <div className='cor-title-container'>
                <p className='cor-title'>Chance of Rain</p>
            </div>

            <div className='cor-forecast'>
                {formattedData.map((item, index) => (
                    <div key={index} className='cor-item'>
                        <p className='cor-time'>{item.time}</p>
                        <div className='cor-progress' style={{ backgroundColor: bgColor , opacity:'0.5' }}>
                            <ProgressBar now={item.precipitations} style={{ backgroundColor: barColor }} />
                        </div>
                        <p className='cor-percent'>{`${item.precipitations}%`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChanceOfRain;
