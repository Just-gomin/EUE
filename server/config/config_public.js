/*
    ### Configurations File.

    - 해당 파일은 공개용으로 작성한 것 입니다. 동일 디렉토리 상에서 config.js를 생성해 사용합니다.
    - 환경 변수들을 관리하는 파일입니다.
    - 개발 환경에 맞게 값들을 변경하여 사용합니다.
*/

// State Production or Development.
const PRODUCTION = false;

// # Client Envs
const CLIENT_PROTOCOL = PRODUCTION ? "https" : "http";
const CLIENT_HOST = PRODUCTION ? "YOUR_PRODUCTION_HOST" : "localhost";
const CLIENT_PORT = PRODUCTION
  ? "YOUR_PRODUCTION_PORT"
  : "YOUR_DEVELOPMENT_PORT";

// # Server Envs
const SERVER_PROTOCOL = PRODUCTION ? "https" : "http";
const SERVER_HOST = PRODUCTION ? "YOUR_PRODUCTION_HOST" : "localhost";
const SERVER_PORT = PRODUCTION
  ? "YOUR_PRODUCTION_PORT"
  : "YOUR_DEVELOPMENT_PORT";

// # DB Info.
const DB_USER = PRODUCTION
  ? "YOUR_PRODUCTION_DB_USER"
  : "YOUR_DEVELOPMENT_DB_USER";
const DB_PASSWORD = PRODUCTION
  ? "YOUR_PRODUCTION_DB_PASSWORD"
  : "YOUR_DEVELOPMENT_DB_PASSWORD";
const DB_HOST = "localhost";
const DB_PORT = "5432";
const DB_DATABASE = PRODUCTION
  ? "YOUR_PRODUCTION_DB_NAME"
  : "YOUR_DEVELOPMENT_DB_NAME";

// # API.

// ## OpenWeatherMap
const OPENWEATHERMAP_API_KEY = "YOUR_OpenWeatherMap_API_KEY";

// ## Nodemailer.
const NODEMAILER_SERVICE = "gmail";
const NODEMAILER_USER = "YOUR_MAIL_ADDRESS";
const NODEMAILER_GAMIL_CLIENT_ID = "YOUR_API_CLIENT_ID";
const NODEMAILER_GMAIL_REFRESH_TOKEN = "YOUR_GMAIL_REFRESH_TOKEN";

// # Secret Key.
const AUTH_MAIL_SECRETKEY = "YOUR_MAIL_SECRETKEY";
const AUTH_ACCESS_TOKEN_SECRETKEY = "YOUR_ACCESS_TOKEN_SECRETKEY";

// # Server Inner DIR
const DIR_DATA_PROCESSING_MAIN = "/src/data_processing/main.py";
const DIR_DATA_PROCESSING_PREDICTION = "/src/data_processing/predict.py";

const envs = {
  production: PRODUCTION,
  client: {
    protocol: CLIENT_PROTOCOL,
    host: CLIENT_HOST,
    port: CLIENT_PORT,
  },
  server: {
    protocol: SERVER_PROTOCOL,
    host: SERVER_HOST,
    port: SERVER_PORT,
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
      gmail_client_secret: NODEMAILER_GMAIL_CLIENT_SECRET,
      gmail_refresh_token: NODEMAILER_GMAIL_REFRESH_TOKEN,
    },
  },
  secretKey: {
    mail: AUTH_MAIL_SECRETKEY,
    access_token: AUTH_ACCESS_TOKEN_SECRETKEY,
  },
  inner_dir: {
    data_processing_main: DIR_DATA_PROCESSING_MAIN,
    data_processing_prediction: DIR_DATA_PROCESSING_PREDICTION,
  },
};

export default envs;
