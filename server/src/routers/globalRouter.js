import express from "express";
import routes from "../routes";
import { getHome } from "../controllers/globalController";
import {
  getConfirm,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", getHome); // For development test.

// Authentication
globalRouter.get(routes.signup, getSignup); // For development test.
globalRouter.get(routes.login, getLogin); // For development test.
globalRouter.post(routes.signup, postSignup);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.confirm, getConfirm);

export default globalRouter;
