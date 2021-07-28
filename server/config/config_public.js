/*
    ### Configurations File.

    - 해당 파일은 공개용으로 작성한 것 입니다. 동일 디렉토리 상에서 config.js를 생성해 사용합니다.
    - 환경 변수들을 관리하는 파일입니다.
    - 개발 환경에 맞게 값들을 변경하여 사용합니다.
*/

// # Server Envs
const PROTOCOL = "http";
const HOST = "localhost";
const PORT = 4500;

// # DB Info.
const DB_USER = "postgres";
const DB_PASSWORD = "YOUR_PostgreSQL_PASSWORD";
const DB_HOST = "localhost";
const DB_PORT = "5432";
const DB_DATABASE = "YOUR_DB_NAME";

// # API.

// ## OpenWeatherMap
const OPENWEATHERMAP_API_KEY = "YOUR_OpenWeatherMap_API_KEY";

// # Nodemailer.
const NODEMAILER_SERVICE = "gmail";
const NODEMAILER_USER = "YOUR_MAIL_ADDRESS";
const NODEMAILER_GAMIL_CLIENT_ID = "YOUR_API_CLIENT_ID";
const NODEMAILER_GMAIL_CLIENT_PASSWORD = "YOUR_API_CLIENT_PASSWORD";
const NODEMAILER_GMAIL_REFRESH_TOKEN = "YOUR_GMAIL_REFRESH_TOKEN";

// # Secret Key.
const AUTH_MAIL_SECRETKEY = "YOUR_MAIL_SECRETKEY";
const AUTH_ACCESS_TOKEN_SECRETKEY = "YOUR_ACCESS_TOKEN_SECRETKEY";

const envs = {
  server: {
    protocol: PROTOCOL,
    host: HOST,
    port: PORT,
  },
  db: {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
  },
  api: {
    openweathermap: {
      api_key: OPENWEATHERMAP_API_KEY,
    },
    nodemailer: {
      service: NODEMAILER_SERVICE,
      user: NODEMAILER_USER,
      gmail_client_id: NODEMAILER_GAMIL_CLIENT_ID,
      gmail_client_passowrd: NODEMAILER_GMAIL_CLIENT_PASSWORD,
      gmail_refresh_token: NODEMAILER_GMAIL_REFRESH_TOKEN,
    },
  },
  secretKey: {
    mail: AUTH_MAIL_SECRETKEY,
    access_token: AUTH_ACCESS_TOKEN_SECRETKEY,
  },
};

export default envs;
