import React, { useEffect, useState } from 'react'
import { useLocationContext } from '../Context/LocationContext';
import { useCurrentWeatherContext } from '../Context/CurrentWeatherContext';
import { useDailyWeatherContext } from '../Context/DailyWeatherContext';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Humidity from '../assests/humidity.png'
import Rain from '../assests/rain.png'
import UV from '../assests/uv.png'
import Wind from '../assests/wind.png'
import Sunset from '../assests/sunset.png'
import Sunrise from '../assests/sunrise.png'
import Location from '../assests/location.png'
import { useWmoContext } from '../Context/WmoContext';
import { useHourlyWeatherContext } from '../Context/HourlyWeatherContext';

function CurrentOverView() {
    const { currentData, loading } = useCurrentWeatherContext();
    const { sunrise, sunset, uvIndex } = useDailyWeatherContext();
    const { visibility } = useHourlyWeatherContext();
    const [time, setTime] = useState('');
    const [bgColor, setBgColor] = useState('');
    const { location } = useLocationContext();
    const [locationName, setLocationName] = useState({});
    const { currentWeatherDescription } = useWmoContext();
    const [longDate, setLongDate] = useState('');
    const [timeSunrise, setTimeSunrise] = useState('');
    const [timeSunset, setTimeSunset] = useState('');

    const getTime = () => {
        const now = new Date();
        const hour12Time = now.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });
        setTime(hour12Time);
    
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
    
    const getDate = () => {
        const date = new Date();
        const day = date.getDate();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const longDate = `Today, ${day} ${monthName}`;
        setLongDate(longDate);
    };

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

    const fetchLocationName = (latitude, longitude) => {
        try {
            fetch(`https://us1.locationiq.com/v1/reverse?key=pk.c8bf3623d183ca9fa7ee0c47f51c4c32&lat=${latitude}&lon=${longitude}&format=json`)
                .then((response) => response.json())
                .then((data) => { setLocationName(data); })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDate();
        getIsoTime();
        getTime();
    }, []);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            fetchLocationName(location.latitude, location.longitude);
        }
    }, [location]);

    return (
        <div className='cov-container'>
            <div className='c-temp-container' style={{backgroundColor:bgColor}}>
                <div className='cov-loccontainer'>
                    <div className='cov-locicon'>
                        <img className='cov-icon' src={Location} />
                    </div>
                    <div className='cov-location'>
                        {locationName && locationName.address ? (
                            <p className='c-location'>{locationName.address.town}, {locationName.address.country}</p>
                        ) : (
                            console.log("Current location is loading...")
                        )}
                    </div>
                </div>
                <div className='cov-title-temp'>
                    <div className='cov-title'>
                        <p className='cov-weather'>Weather</p>
                        <p className='cov-now'>Now</p>
                    </div>
                    <div className='cov-temp-desc-container'>
                        <p className='cov-wmo' >{currentWeatherDescription}</p>
                        {currentData && currentData.current ? (
                            <p className='cov-temp' >{currentData.current.temperature_2m}°</p>
                        ) : (
                            console.log("Current temperature is loading...")
                        )}


                    </div>
                    <div className='cov-temp-desc-container'>
                        <p className='cov-wmo' >Visibility</p>
                        <p className='cov-temp' >{visibility} mi</p>

                    </div>
                </div>
            </div>
            <div className='cov-data-container'>
                {loading ? (
                    console.log("Current Data Loading...")
                ) : (
                    currentData && (
                        <div className='cov-data'>

                            <div className='cov-left'>
                                <div className='crd-body'>
                                    <img src={Rain} className='co-icon' />
                                    <div className='crd-content'>
                                        <p className='crd-text'>Rain</p>
                                        <p className='crd-title'>{currentData.current.rain} mm</p>
                                    </div>
                                </div>
                                <div className='crd-body'>
                                    <img src={Wind} className='co-icon' />
                                    <div className='crd-content'>
                                        <p className='crd-text'>Wind Speed</p>
                                        <p className='crd-title'>{currentData.current.wind_speed_10m} km/h</p>
                                    </div>
                                </div>
                                <div className='crd-body'>
                                        <img src={Sunrise} className='co-icon' />
                                    <div className='crd-content'>
                                        <p className='crd-text'>Sunrise</p>
                                        <p className='crd-title'>{timeSunrise}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='cov-right'>
                                <div className='crd-body'>
                                    <img src={Humidity} className='co-icon' />
                                    <div className='crd-content'>
                                        <p className='crd-text'>Humidity</p>
                                        <p className='crd-title'>{currentData.current.relative_humidity_2m}%</p>
                                    </div>
                                </div>
                                <div className='crd-body'>
                                    <img src={UV} className='co-icon' />
                                    <div className='crd-content'>
                                        <p className='crd-text'>UV Index</p>
                                        <p className='crd-title'>{uvIndex}</p>
                                    </div>
                                </div>
                                <div className='crd-body'>
                                    <img src={Sunset} className='co-icon' />
                                    <div className='crd-content'>
                                        <p className='crd-text'>Sunset</p>
                                        <p className='crd-title'>{timeSunset}</p>
                                    </div>
                                </div>
                            </div>

                            {/* <hr className='hrline' />
                            <div className='crd-body'>
                                <img src={Sunrise} className='co-icon' />
                                <div className='crd-content'>
                                    <p className='crd-text'>Sun Rise</p>
                                    <p className='crd-title'>{timeSunrise}</p>
                                </div>
                            </div>
                            <hr className='hrline' />
                            <div className='crd-body'>
                                <img src={Sunset} className='co-icon' />
                                <div className='crd-content'>
                                    <p className='crd-text'>Sun Set</p>
                                    <p className='crd-title'>{timeSunset}</p>
                                </div>
                            </div> */}


                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default CurrentOverView
