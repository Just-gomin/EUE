import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Col } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2'
import { callUserInfo } from '../utils/CheckDB';
import { routesClient } from './../routesClient';
import { isLogined } from './../utils/Auth';

function ChartHumidity() {

    const [humi, setHumi] = useState([])
    const [newLabel, setNewLabel] = useState([])

    useEffect(() => {
        if (isLogined()) {
            axios.get(routesClient.userWeather, { withCredentials: true })
                .then((res) => {
                    console.log('humi', res.data.contents.weather_in)
                    const userWeather = res.data.contents.weather_in
                    const Array = []
                    const Array2 = []
                    for (let i = 0; i < userWeather.length; i++) {
                        Array.push(userWeather[i].humi)
                        Array2.push(userWeather[i].collected_at.split('T')[1].split('.')[0])
                    }
                    setHumi(Array)
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
                        Array.push(outWeather[i].humi)
                        Array2.push(outWeather[i].collected_at.split('T')[1].split('.')[0])
                        // const colHour = outWeather[i].collected_at.split('T')[1].split('.')[0].split(':')[0]
                        // const colMin = outWeather[i].collected_at.split('T')[1].split('.')[0].split(':')[1]
                    }
                    setHumi(Array)
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
                ticks: {
                    min: 0, // y축 스케일에 대한 최소값 설정
                    stepSize: 1, // y축 그리드 한 칸당 수치
                }
            }]
        },

        // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
        // true : 크기가 알아서 결정됨.
        maintainAspectRatio: false
    }
    const data = {
        labels: newLabel,
        datasets: [
            {
                label: '습도',
                data: humi,
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

export default ChartHumidity;