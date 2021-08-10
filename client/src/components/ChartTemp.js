import React from "react";
import { Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
function ChartTemp({ temp, newLabel }) {
  const options = {
    legend: {
      display: true, // label 보이기 여부
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0, // y축 스케일에 대한 최소값 설정
            stepSize: 0.5, // y축 그리드 한 칸당 수치
          },
        },
      ],
    },

    // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    // true : 크기가 알아서 결정됨.
    maintainAspectRatio: false,
  };
  const data = {
    labels: newLabel,
    datasets: [
      {
        label: "온도",
        borderWidth: "2",
        data: temp,
        borderColor: [
          "rgba(75,192,192,1)",
          "rgba(75,192,192,1)",
          "rgba(75,192,192,1)",
          "rgba(75,192,192,1)",
          "rgba(75,192,192,1)",
          "rgba(75,192,192,1)",

          "rgba(191,191,191,1)",
          "rgba(191,191,191,1)",
          "rgba(191,191,191,1)",
        ],

        backgroundColor: [
          "rgba(75,192,192,0.1)",
          "rgba(75,192,192,0.1)",
          "rgba(75,192,192,0.1)",
          "rgba(75,192,192,0.1)",
          "rgba(75,192,192,0.1)",
          "rgba(75,192,192,0.1)",

          "rgba(191,191,191,0.1)",
          "rgba(191,191,191,0.1)",
          "rgba(191,191,191,0.1)",
        ],
      },
    ],
  };

  return (
    <Col id="chartTab">
      <Bar data={data} options={options} />
    </Col>
  );
}

export default ChartTemp;
