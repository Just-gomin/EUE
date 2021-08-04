import db from "../db/index";
import envs from "../../config/config";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import resForm from "../resForm";

// 외부 수집기로 부터 들어온 정보 처리
export const handleOutData = async (locCode, date, lat, lng) => {
  try {
    // OpenWeatherAPI로 부터 지역의 날씨 정보획득을 위해 지역의 경도와 위도, API Key, 단위 기준 metric 전달
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${envs.api.openweathermap.api_key}&units=metric`
    );
    const json = await response.json();

    const temp = json["main"]["temp"];
    const humi = json["main"]["humidity"];
    const press = json["main"]["pressure"];
    const wind_speed = json["wind"]["speed"];

    await db.Weather_Out.create(
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

    console.log("Outside data successfully stored.");
  } catch (err) {
    console.log("Input Weather_Out Data Error.");
    console.log(err);
  }
};

// 내부 수집기로 부터 들어온 정보 처리
const handleInData = async (email, date, temp, humi, lights) => {
  try {
    await db.Weather_In.create(
      {
        host: email,
        collected_at: date,
        temp: temp,
        humi: humi,
        lights: lights,
      },
      {
        logging: false,
      }
    );

    console.log("Inside data successfully stored.");
  } catch (err) {
    console.log("Input Weather_In Data Error.");
    console.log(err);
  }
};

// 데이터 수신 처리
export const getDataInput = (req, res) => {
  try {
    if (req.query.type === "OUT") {
      // 외부 데이터 수집기
      const {
        query: { locCode, date, lat, lng },
      } = req;

      const trans_date = new Date(date);

      console.log(
        `Outside[${locCode}] Data(date: ${trans_date}/ lat: ${lat}/ lng: ${lng}) Input.`
      );
      handleOutData(locCode, trans_date, lat, lng);
    } else {
      // 내부 데이터 수집기 동작
      const {
        query: { email, date, temp, humi, lights },
      } = req;

      const trans_date = new Date(date);

      console.log(
        `User[${email}] Data(date: ${trans_date}/ temp: ${temp}/ humi: ${humi}/ lights: ${lights}) Input.`
      );
      handleInData(email, trans_date, temp, humi, lights);
    }
    res.status(resForm.code.ok).json({ msg: resForm.msg.ok });
  } catch (err) {
    console.log(err);
    res.status(resForm.code.err).json({ msg: resForm.msg.err });
  }
};

// 사용자의 데이터 가져오기 및 예측 값 전송
export const getUserWeatherData = (req, res) => {
  const {
    cookies: { acs_token },
  } = req;

  try {
    /* 사용자 email에 따른 사용자 날씨 데이터 가져오기 */
    const decoded = jwt.decode(acs_token);
    const result = db.Weather_In.findAll({
      where: { host: decoded.email },
      logging: false,
    });

    res.json({ msg: resForm.msg.ok, contents: { weather_in: result } });
  } catch (err) {
    console.log(err);
    res.json({ msg: resForm.msg.err, contents: { error: err } });
  }
};

// 실외 날씨 데이터 요청 처리
export const getOutWeatherData = async (req, res) => {
  const {
    query: { loccode },
  } = req;
  try {
    // 실외 지역 번호를 통해 날씨 데이터 전송.
    const result = await db.Weather_Out.findAll({
      where: { loc_code: loccode },
      order: [["collected_at", "DESC"]],
      logging: false,
    });

    res.json({ msg: resForm.msg.ok, contents: { weather_out: result } });
  } catch (err) {
    console.log(err);
    res.json({ msg: resForm.msg.err, contents: { error: err } });
  }
};

// 지역 코드 요청 처리
export const getLocCode = async (req, res) => {
  try {
    /* 통합 지역 코드 및 이름 json으로 생성 및 전송 */
    const does = await db.Doe.findAll({
      order: [["name_doe", "ASC"]],
      logging: false,
    });
    const sggs = await db.Sgg.findAll({
      order: [["name_sgg", "ASC"]],
      logging: false,
    });
    const emds = await db.Emd.findAll({
      order: [["name_emd", "ASC"]],
      logging: false,
    });

    let doe_sgg = [];
    let sgg_emd = [];

    does.map((info_doe) => {
      let temp = {
        name_doe: info_doe["name_doe"],
        code_doe: info_doe["code_doe"],
      };
      temp.sgg = sggs.filter(
        (info_sgg) => info_sgg["code_doe"] === info_doe["code_doe"]
      );
      doe_sgg.push(temp);
    });

    sggs.map((info_sgg) => {
      let temp = {
        code_doe: info_sgg["code_doe"],
        name_sgg: info_sgg["name_sgg"],
        code_sgg: info_sgg["code_sgg"],
      };
      temp.emd = emds.filter(
        (info_emd) => info_emd["code_sgg"] === info_sgg["code_sgg"]
      );
      sgg_emd.push(temp);
    });

    res.json({
      msg: resForm.msg.ok,
      contents: {
        loc_code: {
          DOE: does,
          SGG: doe_sgg,
          EMD: sgg_emd,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.json({ msg: resForm.msg.err, contents: { error: err } });
  }
};
