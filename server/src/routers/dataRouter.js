import express from "express";
import routes from "../routes";
import { getDataInput, postDataInput } from "../controllers/dataController";

const dataRouter = express.Router();

dataRouter.get(routes.dataInput, getDataInput);
dataRouter.post(routes.dataInput, postDataInput);

export default dataRouter;
