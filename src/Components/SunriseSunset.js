import React, {useState, useEffect} from 'react'
import { useDailyWeatherContext } from '../Context/DailyWeatherContext';
import Sunset from '../assests/sunset.png'
import Sunrise from '../assests/sunrise.png'

function SunriseSunset() {
    const { sunrise, sunset } = useDailyWeatherContext();
    const [timeSunrise, setTimeSunrise] = useState('');
    const [timeSunset, setTimeSunset] = useState('');

    const getIsoTime = () => {
        const options = { hour: '2-digit', minute: '2-digit' };
    
        const time1 = new Date(sunrise);
        const sunriseTime = time1.toLocaleTimeString([], options);
    
        const time2 = new Date(sunset);
        const sunsetTime = time2.toLocaleTimeString([], options);
    
        setTimeSunrise(sunriseTime);
        setTimeSunset(sunsetTime);
        console.log("ISO sunrise Time", sunriseTime);
        console.log("ISO sunset Time", sunsetTime);
    }
    

    useEffect(() => {
        getIsoTime();
    }, []);

    return (
        <div className='ss-container'>
            <p className='ss-title'>Sunrise & Sunset</p>
            <div className='ss'>
                <div className='sunrise'>
                    <img src={Sunrise} className='s-icon' />
                    <p className='s-text'>{timeSunrise}</p>
                </div>
                <div className='sunset'>
                    <img src={Sunset} className='s-icon' />
                    <p className='s-text'>{timeSunset}</p>
                </div>
            </div>
        </div>
    )
}

export default SunriseSunset
