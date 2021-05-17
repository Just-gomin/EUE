import app from "./app";
import dotenv from "dotenv";
import "./schedules"; // 매일 자정 데이터 처리

dotenv.config();

const PORT = process.env.PORT || 4500;

const handleListening = () => {
  console.log(`✅ Listening on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
