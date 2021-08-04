import React, { useState } from 'react'
import { Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'
import { callUserInfo } from '../utils/CheckDB';
import { useEffect } from 'react';
import axios from 'axios';
import { routesClient } from './../routesClient';

function ChartTemp() {

    const [temp, setTemp] = useState([])

    useEffect(() => {
        callUserInfo().then((res) => {
            const outs = axios.get(routesClient.outsideLoc + res['loc_code'])
            return outs
                .then((res) => {
                    const outWeather = res.data.contents.weather_out
                    console.log(res.data.contents.weather_out)
                    let i = 0;
                    // setTemp(res.data.contents.weather_out[0].temp)
                    const tempArray = []
                    for (i; i < 3; i++) {
                        console.log(i)
                        console.log(outWeather[i])
                        tempArray.push(outWeather[i].temp)
                    }
                    setTemp(tempArray)
                })
        })
    }, [])

    console.log(temp)

    const options = {
        legend: {
            display: true, // label 보이기 여부
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0, // y축 스케일에 대한 최소값 설정
                    stepSize: 0.5, // y축 그리드 한 칸당 수치
                }
            }]
        },

        // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
        // true : 크기가 알아서 결정됨.
        maintainAspectRatio: false
    }
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '77', '88', '99'],
        datasets: [
            {
                label: '온도',
                borderWidth: '2',
                data: temp,
                borderColor: [
                    'rgba(75,192,192,1)',
                    'rgba(75,192,192,1)',
                    'rgba(75,192,192,1)',
                    'rgba(75,192,192,1)',
                    'rgba(75,192,192,1)',
                    'rgba(75,192,192,1)',

                    'rgba(191,191,191,1)',
                    'rgba(191,191,191,1)',
                    'rgba(191,191,191,1)'],
                backgroundColor: [
                    'rgba(75,192,192,0.4)',
                    'rgba(75,192,192,0.4)',
                    'rgba(75,192,192,0.4)',
                    'rgba(75,192,192,0.4)',
                    'rgba(75,192,192,0.4)',
                    'rgba(75,192,192,0.4)',

                    'rgba(191,191,191,0.4)',
                    'rgba(191,191,191,0.4)',
                    'rgba(191,191,191,0.4)']
            }
        ]
    };



    return (
        <Col id='chartTab'>
            <Bar
                data={data}
                options={options}
            />
        </Col>
    )
};

export default ChartTemp;