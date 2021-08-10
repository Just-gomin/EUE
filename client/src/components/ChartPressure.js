import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2'
import { callUserInfo } from '../utils/CheckDB';
import { isLogined } from './../utils/Auth';
import { routesClient } from './../routesClient';

function ChartPressure({press, newLabel}) {

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