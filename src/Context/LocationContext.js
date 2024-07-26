import React, { createContext, useContext, useState, useEffect } from 'react'

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({});
    
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    console.log('Location D:', location);
                   // fetchLocationName(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user location', error);
                }
            )
        }

        else {
            console.error('Location not supported');
        }
    }

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ location,setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);
