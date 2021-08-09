import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { callUserInfo, getWeather } from "../utils/CheckDB";
import { useEffect } from "react";
import axios from "axios";
import { routesClient } from "./../routesClient";
import { isLogined } from "./../utils/Auth";

function ChartTemp() {
  const [temp, setTemp] = useState([]);
  const [newLabel, setNewLabel] = useState([]);

  useEffect(() => {
    if (isLogined()) {
      axios
        .get(routesClient.userWeather, { withCredentials: true })
        .then((res) => {
          console.log("temp", res.data.contents);
          const userWeather = res.data.contents.weather_in;
          const userWeatherPredict = res.data.contents.weather_predict;
          const Array = [];
          const Array2 = [];
          for (let i = 3; i < 9; i++) {
            Array.push(userWeather[i].temp);
            Array2.push(
              userWeather[i].collected_at.split("T")[1].split(".")[0]
            );
          }
          for (let j = 0; j < 3; j++) {
            Array.push(userWeatherPredict[j].temp);
            Array2.push(
              userWeatherPredict[j].collected_at.split("T")[1].split(".")[0]
            );
          }
          setTemp(Array);
          setNewLabel(Array2);
        });
    } else {
      axios.get(routesClient.outsideLoc + `3743011`).then((res) => {
        const outWeather = res.data.contents.weather_out;
        const Array = [];
        const Array2 = [];
        console.log(outWeather);
        // let i = outWeather.length - 9;
        let i = 0;
        for (i; i < outWeather.length; i++) {
          Array.push(outWeather[i].temp);
          Array2.push(outWeather[i].collected_at.split("T")[1].split(".")[0]);
        }
        setTemp(Array);
        setNewLabel(Array2);
      });
    }
  }, []);

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
