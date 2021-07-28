import express from "express";
import routes from "../routes";
import { getHome } from "../controllers/globalController";
import {
  getConfirm,
  getEditProfile,
  getLogin,
  getSignup,
  getUserInfo,
  postEditProfile,
  postLogin,
  postSignup,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

// For development test.
globalRouter.get("/", getHome);
globalRouter.get(routes.signup, getSignup);
globalRouter.get(routes.login, getLogin);
globalRouter.get(routes.editProfile, onlyPrivate, getEditProfile);

// Authentication
globalRouter.post(routes.signup, postSignup);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.confirm, getConfirm);

// User Info
globalRouter.get(routes.userinfo, onlyPrivate, getUserInfo);
globalRouter.post(routes.editProfile, onlyPrivate, postEditProfile);

export default globalRouter;
