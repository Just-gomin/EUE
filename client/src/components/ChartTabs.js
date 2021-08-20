import { useEffect, useState } from "react";
import { Card, Row, Tab, Tabs } from "react-bootstrap";
import ChartTemp from "./ChartTemp";
import ChartHumidity from "./ChartHumidity";
import ChartWindSpeed from "./ChartWindSpeed";
import ChartPressure from "./ChartPressure";
import "../App.css";
import { isLogined } from "./../utils/Auth";
import axios from "axios";
import { routesClient } from "./../routesClient";

function ChartTabs() {
  const cardstyled = {
    margin: "auto",
    padding: "1em",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    borderWidth: "3px",
    borderRadius: "20px",
    borderColor: "rgb(110, 189, 142)",
    color: "#04AB70",
  };

  const [temp, setTemp] = useState([]);
  const [press, setPress] = useState([]);
  const [humi, setHumi] = useState([]);
  const [windSpd, setWindSpd] = useState([]);

  const [newLabel, setNewLabel] = useState([]);
  const [tempNewLabel, setTempNewLabel] = useState([]);

  useEffect(() => {
    if (isLogined()) {
      axios
        .get(routesClient.userWeather, { withCredentials: true })
        .then((res) => {
          console.log(res.data.contents.weather_in);
          const userWeather = res.data.contents.weather_in;
          const userWeatherPredict = res.data.contents.weather_predict;

          const tempArray = [];
          const humiArray = [];
          const pressArray = [];
          const windspeedArray = [];

          const tempLabelArray = [];
          const labelArray = [];

          for (let i = 0; i < userWeather.length; i++) {
            tempArray.push(userWeather[i].temp);
            humiArray.push(userWeather[i].humi);
            pressArray.push(userWeather[i].press);
            windspeedArray.push(userWeather[i].wind_speed);

            let date = new Date(
              new Date(userWeather[i].collected_at).getTime()
            );
            let hour = date.getHours();
            let minute = date.getMinutes();
            let f_date = `${hour < 10 ? `0${hour}` : hour}:${
              minute < 10 ? `0${minute}` : minute
            }`;

            tempLabelArray.push(f_date);
            labelArray.push(`${date.getHours()}:${date.getMinutes()}`);
          }
          for (let j = 0; j < userWeatherPredict.length; j++) {
            tempArray.push(userWeatherPredict[j].temp);
            let date = new Date(
              new Date(userWeatherPredict[j].collected_at).getTime()
            );
            let hour = date.getHours();
            let minute = date.getMinutes();
            let f_date = `${hour < 10 ? `0${hour}` : hour}:${
              minute < 10 ? `0${minute}` : minute
            }`;
            tempLabelArray.push(f_date);
          }

          console.log(tempLabelArray);
          console.log(userWeather);
          console.log(userWeatherPredict);

          setTemp(tempArray);
          setHumi(humiArray);
          setPress(pressArray);
          setWindSpd(windspeedArray);

          setTempNewLabel(tempLabelArray);
          setNewLabel(labelArray);
        });
    } else {
      axios.get(routesClient.outsideLoc + `3743011`).then((res) => {
        const outWeather = res.data.contents.weather_out;

        const tempArray = [];
        const humiArray = [];
        const pressArray = [];
        const windspeedArray = [];

        const tempLabelArray = [];
        const labelArray = [];

        for (let i = 0; i < outWeather.length; i++) {
          tempArray.push(outWeather[i].temp);
          humiArray.push(outWeather[i].humi);
          pressArray.push(outWeather[i].press);
          windspeedArray.push(outWeather[i].wind_speed);

          let date = new Date(new Date(outWeather[i].collected_at).getTime());
          let hour = date.getHours();
          let minute = date.getMinutes();
          let f_date = `${hour < 10 ? `0${hour}` : hour}:${
            minute < 10 ? `0${minute}` : minute
          }`;

          tempLabelArray.push(f_date);
          labelArray.push(f_date);
        }

        console.log(tempLabelArray);

        setTemp(tempArray);
        setHumi(humiArray);
        setPress(pressArray);
        setWindSpd(windspeedArray);

        setTempNewLabel(tempLabelArray);
        setNewLabel(labelArray);
      });
    }
  }, []);
  //3743011 default

  const [key, setKey] = useState("temp");

  return (
    <Row className="text-center w-100 my-2">
      <Card style={cardstyled}>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          <Tab eventKey="temp" title="온도">
            <ChartTemp temp={temp} newLabel={tempNewLabel} />
          </Tab>
          <Tab eventKey="humidity" title="습도">
            <ChartHumidity humi={humi} newLabel={newLabel} />
          </Tab>
          <Tab eventKey="windspeed" title="풍속">
            <ChartWindSpeed windSpd={windSpd} newLabel={newLabel} />
          </Tab>
          <Tab eventKey="pressure" title="기압">
            <ChartPressure press={press} newLabel={newLabel} />
          </Tab>
        </Tabs>
      </Card>
    </Row>
  );
}

export default ChartTabs;
