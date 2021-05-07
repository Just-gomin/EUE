import express from "express";
import routes from "../routes";
import { getDo, getEMD, getSGG } from "../controllers/locCodeController";

const locCodeRouter = express.Router();

locCodeRouter.get(routes.do, getDo);
locCodeRouter.get(routes.sigungu + routes.Detail(), getSGG);
locCodeRouter.get(routes.eupmyeondong + routes.Detail(), getEMD);

export default locCodeRouter;
