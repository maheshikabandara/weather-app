import React, { useState, useEffect } from 'react';
import { useLocationContext } from '../Context/LocationContext';

function AirQuality() {
    const { location } = useLocationContext();
    const [aQData, setAQData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aqBorderColor, setBorderColor] = useState('');
    const [aqDesc, setAQDesc] = useState('');

    const fetchAQData = async (latitude, longitude) => {
        try {
            const response = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=5d0c4498-1b97-4437-87d4-6dc8c7630504`);
            const data = await response.json();
            setAQData(data);
            setLoading(false);
        } catch (error) {
            console.error('AQI', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.latitude && location.longitude) {
            fetchAQData(location.latitude, location.longitude);
        }
    }, [location]);

    const getAQIColor = (aqius) => {
        if (aqius >= 0 && aqius <= 50) {
            return '#9BD64E';
        } else if (aqius >= 51 && aqius <= 100) {
            return '#F7CC3A';
        } else if (aqius >= 101 && aqius <= 150) {
            return '#F57855';
        } else if (aqius >= 151 && aqius <= 200) {
            return '#F65E5F';
        } else if (aqius >= 201 && aqius <= 300) {
            return '#A070B6';
        } else {
            return '#A06A7B';
        }
    };

    const getAqDesc = (aqius) => {
        if (aqius >= 0 && aqius <= 50) {
            setAQDesc('Good');
        } else if (aqius >= 51 && aqius <= 100) {
            setAQDesc('Moderate');
        } else if (aqius >= 101 && aqius <= 150) {
            setAQDesc('Unhealthy for sensitive groups');
        } else if (aqius >= 151 && aqius <= 200) {
            setAQDesc('Unhealthy');
        } else if (aqius >= 201 && aqius <= 300) {
            setAQDesc('Very unhealthy');
        } else {
            setAQDesc('Hazardous');
        }
    }

    useEffect(() => {
        if (aQData && aQData.data && aQData.data.current) {
            const { aqius } = aQData.data.current.pollution;
            setBorderColor(getAQIColor(aqius));
            getAqDesc(aqius);
        }
    }, [aQData]);

    if (loading) {
        console.log("AQI Data is loading")
    }

    if (!aQData || !aQData.data) {
        console.error('Data not available');
        return <p>   </p>;
    }

    const { current } = aQData.data;
    const { aqius } = current.pollution;

    return (
        <div className='aq-container'>
            <div className='aq-titleaq-container'>
                <div className='aq'>
                    <div className='aq-left'>
                        <div className='a-title'>
                            <p className='aq-title'>How is the</p>
                            <p className='aq-title'>Air Quality Today?</p>
                            {/* <p className='aq-subtitle'>Current AQI</p> */}
                        </div>
                        <div className='aqi-value-container'>
                        <p className='aqi-value'>{aqius}</p>
                        <p className='aqi' style={{ backgroundColor: aqBorderColor }}>AQI</p>
                        </div>
                    </div>
                    <div className='aq-right'>
                        <p className='aq-desc' style={{ borderColor: aqBorderColor }}>{aqDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AirQuality;
