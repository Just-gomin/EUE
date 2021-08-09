import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2'
import { callUserInfo } from '../utils/CheckDB';
import { isLogined } from './../utils/Auth';
import { routesClient } from './../routesClient';

function ChartPressure() {

    const [press, setPress] = useState([])
    const [newLabel, setNewLabel] = useState([])

    useEffect(() => {
        if (isLogined()) {
            axios.get(routesClient.userWeather, { withCredentials: true })
                .then((res) => {
                    console.log('press', res.data.contents)
                    const userWeather = res.data.contents.weather_in
                    const Array = []
                    const Array2 = []
                    for (let i = 0; i < userWeather.length; i++) {
                        Array.push(userWeather[i].press)
                        Array2.push(userWeather[i].collected_at.split('T')[1].split('.')[0])
                    }
                    setPress(Array)
                    setNewLabel(Array2)

                })
        }
        else {
            axios.get(routesClient.outsideLoc + `3743011`)
                .then((res) => {
                    const outWeather = res.data.contents.weather_out
                    const Array = []
                    const Array2 = []
                    for (let i = 0; i < outWeather.length; i++) {
                        Array.push(outWeather[i].press)
                        Array2.push(outWeather[i].collected_at.split('T')[1].split('.')[0])
                        // const colHour = outWeather[i].collected_at.split('T')[1].split('.')[0].split(':')[0]
                        // const colMin = outWeather[i].collected_at.split('T')[1].split('.')[0].split(':')[1]
                    }
                    setPress(Array)
                    setNewLabel(Array2)
                })
        }
    }, [])

    const options = {
        legend: {
            display: true, // label 보이기 여부
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    min: 900,
                    max: 1100,
                    stepSize: 20
                }
            }]
        },
        maintainAspectRatio: false
    }
    const data = {
        labels: newLabel,
        datasets: [
            {
                label: '기압',
                data: press,
                lineTension: 0.1,
                borderWidth: '2',
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.1)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'round',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }
        ]
    };

    return (
        <Col id='chartTab'>
            <Line
                data={data}
                options={options}
            />
        </Col>
    )
};

export default ChartPressure;