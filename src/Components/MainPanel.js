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
import Hero from './Hero';
import LineChart from './LineChart';
import { hover } from '@testing-library/user-event/dist/hover';
import CurrentOverView from './CurrentOverView';
import { useWmoContext } from '../Context/WmoContext';
import AirQuality from './AirQuality';
import SunriseSunset from './SunriseSunset';
import HourlyForecast from './HourlyForecast';


function MainPanel() {
  const { currentData, loading } = useCurrentWeatherContext();
  const { uvIndex } = useDailyWeatherContext();
  const [time, setTime] = useState('');
  const [bgColor, setBgColor] = useState('');
  const { location } = useLocationContext();
  const [locationName, setLocationName] = useState({});
  const { weatherDescription } = useWmoContext();

  const getTime = () => {
    const now = new Date();
    const hour12Time = now.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    setTime(hour12Time);

    if (now.getHours() < 12) {
      // setBgColor('#F3E9E9');
      setBgColor('#fff');
    } else if (now.getHours() < 17) {
      //   setBgColor('#D9EFE9');
      setBgColor('#fff');
    } else if (now.getHours() < 21) {
      // setBgColor('#EAEAF1');
      setBgColor('#fff');
    } else {
      setBgColor('#E6EAED');
      //setBgColor('#fff');

    }
  };
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
    getTime();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchLocationName(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <div className='maincontainer' >
      <Hero />
      <div className='main-line'>
        <div className='first-line'>
          <CurrentOverView />
        </div>
          <div className='second-line'>
           <AirQuality />
            <LineChart latitude={location.latitude} longitude={location.longitude} />
          </div>
        </div>
    </div>
  )
}

export default MainPanel
