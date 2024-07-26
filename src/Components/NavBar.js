import React from 'react'
import { useState, useEffect } from 'react';
import { useLocationContext } from '../Context/LocationContext';
import { Card } from 'react-bootstrap';

function NavBar() {
  const { location } = useLocationContext();
  const [locationName, setLocationName] = useState({});
  const [textColor, setTextColor] = useState('');

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
    if (location.latitude && location.longitude) {
      fetchLocationName(location.latitude, location.longitude);
    }
  }, [location]);
  return (
    <div className='nav-container'>
      <div>
        {locationName && locationName.address ? (
          <Card.Text className='sd-state' style={{ color: textColor }}>{locationName.address.town}, {locationName.address.country}</Card.Text>
        ) : (
          console.log("Current location is loading...")
        )}
      </div>
      <div>
      <div class="form-outline mb-4" data-mdb-input-init>
  <input type="search" class="form-control"/>
  <label class="form-label">Search</label>
</div>
      </div>
    </div>
  )
}

export default NavBar
