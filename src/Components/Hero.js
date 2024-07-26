import React, { useEffect, useState } from 'react'
import { useDailyWeatherContext } from '../Context/DailyWeatherContext'
import heroMorning from '../assests/hero-morning.jpg'
import heroAfternoon from '../assests/hero-afternoon.jpg'
import heroSunset from '../assests/hero-sunset.jpg'
import heroNight from '../assests/hero-night.jpg'

function Hero() {
    const [time, setTime] = useState('');
    const [longDate, setLongDate] = useState('');
    const [heroImg, setHeroImg] = useState('');
    const [greeting, setGreeting]= useState('');
    const {date} = useDailyWeatherContext();

    const getTime = () => {
        const now = new Date();
        const hour12Time = now.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        setTime(hour12Time);

        if (now.getHours() < 12) {
            setHeroImg(heroMorning);
            setGreeting("Good Morning");
        } else if (now.getHours() < 17) {
            setHeroImg(heroAfternoon);
            setGreeting("Good Afternoon");
        } else if (now.getHours() < 21) {
            setHeroImg(heroSunset);
            setGreeting("Good Evening");
        } else {
            setHeroImg(heroNight);
            setGreeting("Good Night");
        }
    };
    const getDate = () => {
        const date = new Date();
        const day = date.getDate();
        const monthName = date.toLocaleString('default', {month:'long'});
        const weekDay = date.toLocaleString('default', {weekday:'long'});
        const year = date.getFullYear();
        const longDate = `${weekDay}, ${day} ${monthName}, ${year}`
        console.log('Long Date',longDate);
        setLongDate(longDate);
    }


    useEffect(() => {
        getTime();
        getDate();
        
        const interval = setInterval(()=>{
            getTime();
        }, 60000);
        return ()=> clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
                    <div className="hero-content">
                        <div className='hero-left'>
                            <p className='hero-greeting'>{greeting}</p>
                            <p className='hero-time'>{time}</p>
                        </div>
                        <div className='hero-right'>
                            <p className='hero-date'>{longDate}</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Hero
