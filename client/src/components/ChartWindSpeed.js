import React from 'react'
import { Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'

function ChartWindSpeed() {

    const options = {
        legend: {
            display: true, // label 보이기 여부
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 800, // y축 스케일에 대한 최소값 설정
                    stepSize: 1, // y축 그리드 한 칸당 수치
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
                label: '풍속',
                borderWidth: '2',
                data: [1008, 1007, 1000, 999, 1080, 1020, 1025, 1080, 1030],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.4)'
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

export default ChartWindSpeed;