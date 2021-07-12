import express from "express";
import routes from "../routes";
import { getDoe, getEMD, getSGG } from "../controllers/locCodeController";

const locCodeRouter = express.Router();

locCodeRouter.get(routes.doe, getDoe);
locCodeRouter.get(routes.sigungu + routes.Detail(), getSGG);
locCodeRouter.get(routes.eupmyeondong + routes.Detail(), getEMD);

export default locCodeRouter;
