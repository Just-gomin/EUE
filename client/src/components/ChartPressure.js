import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2'

function ChartPressure() {

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
        labels: ['1', '2', '3', '4', '5', '6', '77', '88', '99'],
        datasets: [
            {
                label: '기압',
                data: [1008, 1007, 1000, 1010, 1080, 1020, 1025, 1080, 1030],
                borderWidth: '2',
                fill: true,
                borderColor: 'rgba(75,192,192)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                tension: 0.3
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