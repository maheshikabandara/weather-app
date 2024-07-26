import React, { useEffect, useState } from 'react';
import { useLocationContext } from '../Context/LocationContext';
import { Line } from 'react-chartjs-2';
import { Chart, Colors, elements, Interaction, plugins, registerables, scales } from 'chart.js';
import { Card } from 'react-bootstrap';


Chart.register(...registerables);

const LineChart = () => {
    const { location } = useLocationContext();
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [borderColor, setBorderColor] = useState('');
    //const [options, setOptions] = useState({});

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
            setBorderColor('#EA8686');
        } else if (now.getHours() < 17) {
            setBgColor('#E0FAFF');
            setBorderColor('#29454F');
        } else if (now.getHours() < 21) {
            setBgColor('#E9E9FF');
            setBorderColor('#7665AA');
        } else {
            setBgColor('#D3F2FF');
            setBorderColor('#234C71');

        }
    };

    useEffect(() => {
        getTime();
    }, []);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            fetchData(location.latitude, location.longitude);
        }
    }, [location]);

    const fetchData = (latitude, longitude) => {
        setLoading(true);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
            .then((response) => response.json())
            .then((data) => {
                if (data.daily) {
                    const labels = data.daily.time || [];
                    const maxTemps = data.daily.temperature_2m_max || [];
                    const minTemps = data.daily.temperature_2m_min || [];

                    const avgTemps = maxTemps.map((temp, index) => (temp + minTemps[index]) / 2);
                    console.log('Sum of the Temp', avgTemps);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Avg Temperature',
                                data: avgTemps,
                                backgroundColor: bgColor,
                                opacity: 1,
                                borderColor: borderColor,
                                borderWidth: 2,
                                fill: true,
                                pointRadius: 0
                            },
                        ],
                        responsive: true,

                    });
                    setLoading(false);
                } else {
                    console.error('API response does not contain daily data');
                }
            })
            .catch((error) => {
                console.error('Error fetching Line chart data:', error);
                setLoading(false);
            });
    };

    const options = {
        plugins: {
            tooltip: {
                enabled: true,
            }

        },
        elements: {
            line: {
                cubicInterpolationMode: 'monotone'
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Days'
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'black',
                    backgroundColor: 'white'
                },

            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Temperature'
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'black',
                    backgroundColor: 'white'
                },
                beginAtZero: false
            }
        }

    }

    return (
        <div className='line-chart'>
            <div className='line-title'>Average Temperature</div>
            <div className='linechart-body'>
                {loading ? (
                    console.log('Loading Line Chart Data')
                ) : (

                    <Line data={chartData} options={options} />
                )}
            </div>
        </div>
    );
};

export default LineChart;
