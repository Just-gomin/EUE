import express from "express";
import routes from "../routes";
import {
  getDataInput,
  getUserWeatherData,
} from "../controllers/dataController";
import { onlyPrivate } from "../middlewares";

const dataRouter = express.Router();

dataRouter.get(routes.dataInput, getDataInput);
dataRouter.get(routes.dataUser, onlyPrivate, getUserWeatherData);

export default dataRouter;
