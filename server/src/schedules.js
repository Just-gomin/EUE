import db from "./db/index";
import envs from "../config/config";
import schedule from "node-schedule";
import { spawn } from "child_process";
import { handleOutData } from "./controllers/dataController";

// Data Processing Python Codes Directory - server directory에서 실행
const DATA_PROCESSING_DIR = "./src/data_processing/main.py";

// 매일 자정에 실행할 스케줄의 규칙
const rule_dataProcessing = new schedule.RecurrenceRule();
rule_dataProcessing.hour = 0;
rule_dataProcessing.minute = 0;
rule_dataProcessing.second = 0;

// 매일 자정에 실행되는 데이터 처리 스케줄
const dataProcessingJob = schedule.scheduleJob(rule_dataProcessing, () => {
  const today = new Date();

  console.log(
    `${today.getFullYear()}.${
      today.getMonth() + 1
    }.${today.getDate()} - Data Processing Start.`
  );

  const pyprocess = spawn("python", [
    DATA_PROCESSING_DIR,
    envs.db.host,
    envs.db.user,
    envs.db.password,
    envs.db.database,
  ]);

  pyprocess.stdout.on("data", (data) => {
    console.log("Data processing is start.");
    console.log(data.toString()); // Buffer to String.
  });

  pyprocess.stderr.on("data", (error) => {
    console.log("Error in the data processing.");
    console.log(error.toString());
  });

  pyprocess.on("close", () => {
    console.log("The data processing done.");
  });
});

// 10분 마다 지역 외부 날씨 저장 스케쥴
const rules_weather_out_store = {
  "00m": new schedule.RecurrenceRule(),
  "10m": new schedule.RecurrenceRule(),
  "20m": new schedule.RecurrenceRule(),
  "30m": new schedule.RecurrenceRule(),
  "40m": new schedule.RecurrenceRule(),
  "50m": new schedule.RecurrenceRule(),
};

rules_weather_out_store["00m"].minute = 0;
rules_weather_out_store["10m"].minute = 10;
rules_weather_out_store["20m"].minute = 20;
rules_weather_out_store["30m"].minute = 30;
rules_weather_out_store["40m"].minute = 40;
rules_weather_out_store["50m"].minute = 50;

// 임의의 사용자 데이터 등록
const coordinates = [
  { lat: 37.240049, lng: 131.86931, locCode: 3743011 },
  { lat: 37.206616, lng: 127.037113, locCode: 3124053 },
  { lat: 37.666729, lng: 127.051501, locCode: 1111072 },
  { lat: 35.177681, lng: 128.805934, locCode: 3807063 },
];

// 데이터 저장 용 날짜 생성
const make_date = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();

  let minute = now.getMinutes();
  minute = minute - (minute % 10);
  minute = minute < 10 ? `0${minute}` : minute;

  const str_date = `${year}-${month}-${date}T${hour}:${minute}:00+09:00`;
  const collected_at = new Date(str_date);

  return collected_at;
};

// 날씨 저장 스케줄 등록
const weatherOutStoringJob_00m = schedule.scheduleJob(
  rules_weather_out_store["00m"],
  () => {
    const date = make_date();
    coordinates.map(({ lat, lng, locCode }) =>
      handleOutData(locCode, date, lat, lng)
    );
  }
);

const weatherOutStoringJob_10m = schedule.scheduleJob(
  rules_weather_out_store["10m"],
  () => {
    const date = make_date();
    coordinates.map(({ lat, lng, locCode }) =>
      handleOutData(locCode, date, lat, lng)
    );
  }
);

const weatherOutStoringJob_20m = schedule.scheduleJob(
  rules_weather_out_store["20m"],
  () => {
    const date = make_date();
    coordinates.map(({ lat, lng, locCode }) =>
      handleOutData(locCode, date, lat, lng)
    );
  }
);

const weatherOutStoringJob_30m = schedule.scheduleJob(
  rules_weather_out_store["30m"],
  () => {
    const date = make_date();
    coordinates.map(({ lat, lng, locCode }) =>
      handleOutData(locCode, date, lat, lng)
    );
  }
);

const weatherOutStoringJob_40m = schedule.scheduleJob(
  rules_weather_out_store["40m"],
  () => {
    const date = make_date();
    coordinates.map(({ lat, lng, locCode }) =>
      handleOutData(locCode, date, lat, lng)
    );
  }
);

const weatherOutStoringJob_50m = schedule.scheduleJob(
  rules_weather_out_store["50m"],
  () => {
    const date = make_date();
    coordinates.map(({ lat, lng, locCode }) =>
      handleOutData(locCode, date, lat, lng)
    );
  }
);
