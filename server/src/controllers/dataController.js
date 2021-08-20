import db from "../db/index";
import envs from "../../config/config";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import resForm from "../resForm";
import { spawn } from "child_process";

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
export const getUserWeatherData = async (req, res) => {
  const {
    cookies: { acs_token },
  } = req;

  try {
    /*
        # 사용자 email에 따른 사용자 날씨 데이터 가져오기 

        - 2021.08.07 기준, 데이터 수집기의 동작 오류로 인해 외부날씨 반환으로 대체.
        - 예측 날씨 반환 준비되는대로 업데이트
        
    */
    const decoded = jwt.decode(acs_token);

    // const result = db.Weather_In.findAll({
    //   where: { host: decoded.email },
    //   logging: false,
    // });

    const result_user = await db.User.findAll({
      where: {
        email: decoded.email,
      },
      logging: false,
    });
    const user_info = result_user[0];

    const result_weather = await db.Weather_Out.findAll({
      where: {
        loc_code: user_info.loc_code,
      },
      order: [["collected_at", "ASC"]],
      logging: false,
    });

    let temp_weather = result_weather.slice(-6);
    let weather = [];

    temp_weather.map((data) => {
      weather.push({
        loc_code: data["loc_code"],
        collected_at: new Date(new Date(data["collected_at"]).getTime()),
        temp: data["temp"],
        humi: data["humi"],
        press: data["press"],
        wind_speed: data["wind_speed"],
      });
    });

    const pyprocess = spawn("python", [
      envs.inner_dir.data_processing_prediction,
      user_info.email,
    ]);

    pyprocess.stdout.on("data", (data) => {
      let weather_predict = [];

      let temp_predict = data.toString();
      temp_predict = temp_predict.replace("]]", "");
      temp_predict = temp_predict.replace("[[", "");
      temp_predict = temp_predict.trim();
      temp_predict = temp_predict.split(" ");

      temp_predict = temp_predict.filter((val) => val.length > 0);

      let date_10m = new Date(weather[weather.length - 1]["collected_at"]);
      date_10m.setMinutes(date_10m.getMinutes() + 10);

      let date_20m = new Date(weather[weather.length - 1]["collected_at"]);
      date_20m.setMinutes(date_20m.getMinutes() + 20);

      let date_30m = new Date(weather[weather.length - 1]["collected_at"]);
      date_30m.setMinutes(date_30m.getMinutes() + 30);

      let dates = [date_10m, date_20m, date_30m];

      temp_predict.map((temp, index) => {
        weather_predict.push({
          collected_at: dates[index],
          temp: Number(temp),
        });
      });

      res.json({
        msg: resForm.msg.ok,
        contents: { weather_in: weather, weather_predict: weather_predict },
      });
      return;
    });

    pyprocess.on("close", () => {
      console.log("The data prediction is done.");
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: resForm.msg.err,
      contents: { weather_in: [], error: err },
    });
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
      order: [["collected_at", "ASC"]],
      logging: false,
    });

    const weather_out = result.slice(-9);

    res.json({ msg: resForm.msg.ok, contents: { weather_out: weather_out } });
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
