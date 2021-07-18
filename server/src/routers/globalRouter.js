import express from "express";
import routes from "../routes";
import { getHome } from "../controllers/globalController";
import {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);

// Authentication
globalRouter.get(routes.signup, getSignup); // For development test.
globalRouter.get(routes.login, getLogin); // For development test.
globalRouter.post(routes.signup, postSignup);
globalRouter.post(routes.login, postLogin);

export default globalRouter;
