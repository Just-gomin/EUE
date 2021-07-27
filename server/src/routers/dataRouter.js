import express from "express";
import routes from "../routes";
import {
  getDataInput,
  getLocCode,
  getOutWeatherData,
  getUserWeatherData,
} from "../controllers/dataController";
import { onlyPrivate } from "../middlewares";

const dataRouter = express.Router();

// Weather Data Collection
dataRouter.get(routes.dataInput, getDataInput);

// Send Weather Data
dataRouter.get(routes.dataUser, onlyPrivate, getUserWeatherData);
dataRouter.get(routes.dataOutside, getOutWeatherData);

// Send Location Info
dataRouter.get(routes.locCode, getLocCode);

export default dataRouter;
