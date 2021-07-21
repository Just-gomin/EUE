import express from "express";
import routes from "../routes";
import {
  getDataInput,
  getLocCode,
  getUserWeatherData,
} from "../controllers/dataController";
import { onlyPrivate } from "../middlewares";

const dataRouter = express.Router();

dataRouter.get(routes.dataInput, getDataInput);
dataRouter.get(routes.dataUser, onlyPrivate, getUserWeatherData);
dataRouter.get(routes.locCode, getLocCode);

export default dataRouter;
