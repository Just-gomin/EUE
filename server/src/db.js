import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

// MySQL Config
const db_config = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || "EUE",
  connectionLimit: 5,
};

// Creation of MySQL Pool
const pool = mysql.createPool(db_config);

// Pool을 이용시, Connection을 생성 후 반환하여 사용
const connection = (callback) => {
  console.log("db_connection()");
  pool.getConnection(async (err, connection) => {
    console.log("db_connection_poolConnection()");
    await callback(err, connection);
  });
};

export default connection;
