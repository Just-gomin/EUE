import app from "./app";
import dotenv from "dotenv";
import "./schedules"; // 매일 자정 데이터 처리
import db from "./db/index";

dotenv.config();

const PORT = process.env.PORT || 4500;

const handleListening = () => {
  console.log(`✅ Listening on : http://localhost:${PORT}`);
};

// DB 연결
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connect Suceecs!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, handleListening);
