import fs from "fs";
// import mysql from "mysql";
import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const envs = process.env;

const sequelize = new Sequelize(
  envs.DB_DATABASE,
  envs.DB_USER,
  envs.DB_PASSWORD,
  {
    host: envs.DB_HOST,
    dialect: "postgres",
  }
);

const checkCONN = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkCONN();
// // DB Connection
// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST || "localhost",
//   user: process.env.MYSQL_USER || "root",
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE || "EUE",
// });

// const inputDo = (code, name) => {
//   name = name.replace(/\s/g, "");
//   let q = `INSERT INTO LOCDO (CODE,DONAME) VALUES (${code},'${name}');`;
//   db.query(q, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Result : " + result);
//   });
// };

// const inputSi = (code, name, doCode) => {
//   name = name.replace(/\s/g, "");
//   let q = `INSERT INTO LOCSIGUNGU (CODE,DOCODE,SGGNAME) VALUES (${code},${doCode},'${name}');`;
//   db.query(q, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Result : " + result);
//   });
// };

// const inputDong = (code, name, doCode, siCode) => {
//   name = name.replace(/\s/g, "");
//   let q = `INSERT INTO LOCINFO (CODE,DOCODE,SGGCODE,EMDNAME) VALUES (${code},${doCode},${siCode},'${name}');`;
//   db.query(q, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Result : " + result);
//   });
// };

// const setDB = () => {
//   // DB Connect
//   db.connect((err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("connected as id" + db.threadId);
//   });

//   // File Read
//   let originData = fs.readFileSync("data/admAddressCode.csv", "utf8");

//   // Separate Data & Input Data
//   let sepData = originData.split("\r\n");
//   let setDoCode = new Set();
//   let setSiCode = new Set();

//   sepData.forEach((line) => {
//     line = line.replace(/\s/g, "");
//     let addr = line.split(",");

//     const doCode = Number(addr[0]);
//     if (!setDoCode.has(doCode)) {
//       const doName = addr[1];
//       inputDo(doCode, doName);
//       setDoCode.add(doCode);
//     }

//     const siCode = Number(addr[2]);
//     if (!setSiCode.has(siCode)) {
//       const siName = addr[3];
//       inputSi(siCode, siName, doCode);
//       setSiCode.add(siCode);
//     }

//     const dongCode = Number(addr[4]);
//     const dongName = addr[5];
//     inputDong(dongCode, dongName, doCode, siCode);
//   });

//   // Connection Close
//   db.end();
// };

// setDB();
