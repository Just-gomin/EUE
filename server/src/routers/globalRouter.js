import express from "express";
import routes from "../routes";
import { getHome } from "../controllers/dataController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);

export default globalRouter;
