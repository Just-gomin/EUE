import express from "express";
import routes from "../routes";
import { getDataInput } from "../controllers/dataController";

const dataRouter = express.Router();

dataRouter.get(routes.dataInput, getDataInput);

export default dataRouter;
