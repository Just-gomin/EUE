import app from "./app";
import envs from "../config/config";
import "./schedules"; // 매일 자정 데이터 처리
import db from "./db/index";
import setLocTables from "./db/locationSetting";

const PORT = envs.server.port || 4500;

const handleListening = () => {
  console.log(`✅ Listening on : http://localhost:${PORT}`);
};

// DB 연결
db.sequelize
  .sync()
  .then(() => {
    console.log(db.msg.connection_success);
  })
  .then(() => setLocTables())
  .catch((err) => {
    console.log(db.msg.connection_err);
    console.log(err);
  });

app.listen(PORT, handleListening);
