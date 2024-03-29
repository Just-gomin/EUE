import Sequelize from "sequelize";
import envs from "../../config/config";
import Doe from "../models/doe";
import Sgg from "../models/sgg";
import Emd from "../models/emd";
import User from "../models/user";
import Weather_In from "../models/weather_in";
import Weather_Out from "../models/weather_out";
import Data_Processing from "../models/data_processing";

// DB의 정보를 모두 담고 있는 객체 생성
const db = {};

// PostgreSQL과 연결된 Sequelize 객체 생성
const sequelize = new Sequelize(
  envs.db.database,
  envs.db.user,
  envs.db.password,
  {
    host: envs.db.host,
    dialect: "postgres",
  }
);

// db 객체에 값 입력
db.sequelize = sequelize;

// model들 생성
db.Doe = Doe;
Doe.init(sequelize);

db.Sgg = Sgg;
Sgg.init(sequelize);

db.Emd = Emd;
Emd.init(sequelize);

db.User = User;
User.init(sequelize);

db.Weather_In = Weather_In;
Weather_In.init(sequelize);

db.Weather_Out = Weather_Out;
Weather_Out.init(sequelize);

db.Data_Processing = Data_Processing;
Data_Processing.init(sequelize);

// model들 간에 Association 생성
Doe.associate(db);
Sgg.associate(db);
Emd.associate(db);
User.associate(db);
Weather_In.associate(db);
Weather_Out.associate(db);
Data_Processing.associate(db);

// Messages for Data Base.
const msg = {
  connection_success: "DB Connection Success.",
  connection_err: "DB Connection Error.",
  query_success: "DB Query Success.",
  query_err: "DB Querry Error.",
};

db.msg = msg;

export default db;
