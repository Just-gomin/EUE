import fs from "fs";
import fetch from "node-fetch";

const OUT = "Out";
const IN = "In";

// 데이터 수집 기로 부터 받아온 지역 코드 세분화
const locCodeSep = (code = "") => {
  const DO = code.slice(0, 2);
  const SGG = code.slice(0, 5);
  const EMD = code;

  const loc = {
    DO: DO,
    SGG: SGG,
    EMD: EMD,
  };

  return loc;
};

// 데이터가 들어온 시간 데이터 생성
const getTimeInfo = () => {
  const cur = new Date();

  const year = cur.getFullYear();
  const month = cur.getMonth() + 1;
  const date = cur.getDate();
  const hour = cur.getHours();
  const minute = cur.getMinutes();

  const time = {
    year: year,
    month: month,
    date: date,
    hour: hour,
    minute: minute,
  };

  return time;
};

// 데이터를 파일 형식으로 저장
const storeData = (type, time, loc, fdir, data) => {
  const fileName = "wData.csv";

  fs.open(fdir + `/${fileName}`, "a", (err, fd) => {
    if (err) {
      // Directory가 존재하지 않는 경우, 생성
      if (err.code === "ENOENT") {
        console.log("There is no directory.");

        fs.mkdirSync(fdir, { recursive: true }, (err) => {
          if (err) console.log(err);
        });

        console.log("Create directory.");
      } else console.log(err);
    }

    fs.appendFile(fdir + `/${fileName}`, data, (err) => {
      if (err) console.log(err);
      else
        console.log(
          `${time.year}/${time.month}/${time.date} ${time.hour}:${
            time.minute
          } - ${loc.EMD} ${type === OUT ? "Outside" : "User"} data append.`
        );
    });
  });
};

// 외부 수집기로 부터 들어온 정보 처리
const handleOutData = (locCode, lat, lng) => {
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

      const loc = locCodeSep(locCode);
      const time = getTimeInfo();

      const fdir = `data/${loc.DO}/${loc.SGG}/${loc.EMD}/Outside/${time.year}/${time.month}/${time.date}`;
      const data = `${time.hour},${time.minute},${temp},${humi},${press},${wind_speed}\n`;

      storeData(OUT, time, loc, fdir, data);
    })
    .catch((err) => console.log(err));
};

// 내부 수집기로 부터 들어온 정보 처리
const handleInData = (id, locCode, temp, humi, lights) => {
  const loc = locCodeSep(locCode);
  const time = getTimeInfo();

  const fdir = `data/${loc.DO}/${loc.SGG}/${loc.EMD}/${id}/${time.year}/${time.month}/${time.date}`;
  const data = `${time.hour},${time.minute},${temp},${humi},${lights}\n`;

  storeData(IN, time, loc, fdir, data);
};

// 데이터 수신 처리
export const getDataInput = (req, res) => {
  console.log(process.cwd());
  try {
    if (req.query.type === OUT) {
      // 외부 데이터 수집기
      const {
        query: { locCode, lat, lng },
      } = req;

      handleOutData(locCode, lat, lng);
    } else {
      // 내부 데이터 수집기 동작
      const {
        query: { id, locCode, temp, humi, lights },
      } = req;

      handleInData(id, locCode, temp, humi, lights);
    }

    res.status(200).send("<p>OK</p>");
  } catch (error) {
    console.log(error);
  }
};
