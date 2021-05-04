import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import routes from "./routes";

import globalRouter from "./routers/globalRouter";
import dataRouter from "./routers/dataRouter";

import { localmiddleware } from "./middlewares";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// local middleware 사용
app.use(localmiddleware);

// router 사용
app.use(routes.home, globalRouter);
app.use(routes.data, dataRouter);

export default app;
