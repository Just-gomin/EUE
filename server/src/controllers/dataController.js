import routes from "../routes";
import fetch from "node-fetch";

export const getDataInput = (req, res) => {
  console.log(req.query);
  if (req.query.type === "Out") {
    // 외부 데이터 수집기
    const {
      query: { id, type, lat, lng },
    } = req;
    // OpenWeatherAPI로 부터 지역의 날씨 정보획득
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        const temp = json.main.temp;
        const humi = json.main.humidity;
        const press = json.main.pressure;
        const wind_speed = json.wind.speed;
        console.log(id, type, lat, lng, temp, humi, press, wind_speed);
      });
  } else {
    // 내부 데이터 수집기 동작
    const {
      query: { id, type, temp, humi, lights },
    } = req;
    console.log(id, type, temp, humi, lights);
  }

  res.status(200).send("<p>OK</p>");
};
