import mysql from "mysql2/promise";
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

// Creation of MySQL Pool, and Export
export const pool = mysql.createPool(db_config);

// Messages for Data Base.
export const dbMSG = {
  connection_err: "DB Connection Error.",
  query_success: "DB Query Success.",
  query_err: "DB Querry Error.",
};
