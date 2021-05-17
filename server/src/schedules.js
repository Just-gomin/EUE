import schedule from "node-schedule";
import { spawn } from "child_process";
import dotenv from "dotenv";

dotenv.config();

// Data Processing Python Codes Directory - server directory에서 실행
const DATA_PROCESSING_DIR = "./src/data_processing/main.py";

// 매일 자정에 실행할 스케줄의 규칙
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;

// 매일 자정에 실행되는 데이터 처리 스케줄
const dataProcessingJob = schedule.scheduleJob(rule, () => {
  const today = new Date();

  console.log(
    `${today.getFullYear()}.${
      today.getMonth() + 1
    }.${today.getDate()} - Data Processing Start.`
  );

  const pyprocess = spawn("python", [
    DATA_PROCESSING_DIR,
    process.env.MYSQL_HOST,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    process.env.MYSQL_DATABASE,
  ]);

  pyprocess.stdout.on("data", (data) => {
    console.log("Data processing is start.");
  });

  pyprocess.stderr.on("data", (data) => {
    console.log("Error in the data processing.");
  });

  pyprocess.on("close", () => {
    console.log("The data processing done.");
  });
});
