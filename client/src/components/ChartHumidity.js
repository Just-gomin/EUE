import React from 'react'
import { Col } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2'

function ChartHumidity() {

    const cardstyled = {
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '3px',
        borderRadius: '20px',
        borderColor: 'rgb(110, 189, 142)',
        color: '#04AB70'
    }

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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: '습도',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [8, 8], //점선 ex [2,10]
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 6,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [-10, -2, 13, 18, 22, 25, 31, 28, 25, 18, 6, -8]
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