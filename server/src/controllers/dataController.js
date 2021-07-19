import fetch from "node-fetch";
import { serverMSG, statusCode } from "../serverinfo";
import db from "../db/index";
import dotenv from "dotenv";

dotenv.config();

// 외부 수집기로 부터 들어온 정보 처리
const handleOutData = async (locCode, date, lat, lng) => {
  // OpenWeatherAPI로 부터 지역의 날씨 정보획득을 위해 지역의 경도와 위도, API Key, 단위 기준 metric 전달
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
  );
  const json = await response.json();

  const temp = json["main"]["temp"];
  const humi = json["main"]["humidity"];
  const press = json["main"]["pressure"];
  const wind_speed = json["wind"]["speed"];

  await db.Weather_out.create(
    {
      loc_code: Number(locCode),
      collected_at: date,
      temp: temp,
      humi: humi,
      press: press,
      wind_speed: wind_speed,
    },
    {
      logging: false,
    }
  );
};

// 내부 수집기로 부터 들어온 정보 처리
const handleInData = async (id, date, temp, humi, lights) => {
  db.Weather_in.create(
    {
      host: id,
      collected_at: date,
      temp: temp,
      humi: humi,
      lights: lights,
    },
    {
      logging: false,
    }
  );
};

// 데이터 수신 처리
export const getDataInput = (req, res) => {
  try {
    if (req.query.type === "OUT") {
      // 외부 데이터 수집기
      const {
        query: { locCode, date, lat, lng },
      } = req;

      console.log(locCode, date, lat, lng);
      // handleOutData(locCode, date, lat, lng);
    } else {
      // 내부 데이터 수집기 동작
      const {
        query: { id, locCode, date, temp, humi, lights },
      } = req;

      console.log(id, locCode, date, temp, humi, lights);
      // handleInData(id, date, temp, humi, lights);
    }

    res.status(statusCode.ok).send(serverMSG.server_ok);
  } catch (error) {
    console.log(error);
    res.status(statusCode.err).send(serverMSG.server_err);
  }
};

// 사용자의 데이터 가져오기 및 예측 값 전송
export const getUserWeatherData = (req, res) => {
  const {
    params: { email },
  } = req;

  /* 사용자 email에 따른 사용자 날씨 데이터 가져오기 */

  res.status(statusCode.ok).send(serverMSG.server_ok);
};

// 지역 코드 요청 처리
export const getLocCode = (req, res) => {
  /* 통합 지역 코드 및 이름 json으로 생성 및 전송 */

  res.status(statusCode.ok).send(serverMSG.server_ok);
};
