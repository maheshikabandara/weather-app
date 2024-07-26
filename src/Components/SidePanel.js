import React, { useEffect, useState } from 'react';
import { useLocationContext } from '../Context/LocationContext';
import { Card } from 'react-bootstrap';
import { useCurrentWeatherContext } from '../Context/CurrentWeatherContext';
import { useWmoContext } from '../Context/WmoContext';
import HourlyForecast from './HourlyForecast';
import ChanceOfRain from './ChanceOfRain';

function SidePanel() {
  const { location } = useLocationContext();
  const { currentData, loading } = useCurrentWeatherContext();
  const [locationName, setLocationName] = useState({});
  const [time, setTime] = useState('');
  const [longDate, setLongDate] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [cardBgColor, setCardBgColor] = useState('');
  const [textColor, setTextColor] = useState('');
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
      setBgColor('#FFE4E4');
    } else if (now.getHours() < 17) {
        setBgColor('#E0FAFF');
    } else if (now.getHours() < 21) {
        //setBgColor('#E9E9FF');
        setBgColor('#fff')
    } else {
      setBgColor('#D3F2FF');

    }
  };

  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const longDate = `Today, ${day} ${monthName}, ${year}`;
    setLongDate(longDate);
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
    getDate();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchLocationName(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <div className='spcontainer' style={{backgroundColor:bgColor}}>
      <HourlyForecast/>
      <ChanceOfRain/>
    </div>
  )
}

export default SidePanel;
