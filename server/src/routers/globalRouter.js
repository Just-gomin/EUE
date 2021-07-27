import express from "express";
import routes from "../routes";
import { getHome } from "../controllers/globalController";
import {
  getConfirm,
  getLogin,
  getSetLoccode,
  getSignup,
  getUserInfo,
  postEditProfile,
  postLogin,
  postSetLoccode,
  postSignup,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

// For development test.
globalRouter.get("/", getHome);
globalRouter.get(routes.signup, getSignup);
globalRouter.get(routes.login, getLogin);
globalRouter.get(routes.setLoccode, onlyPrivate, getSetLoccode);

// Authentication
globalRouter.post(routes.signup, postSignup);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.confirm, getConfirm);

// User Info
globalRouter.get(routes.userinfo, onlyPrivate, getUserInfo);
globalRouter.post(routes.editProfile, onlyPrivate, postEditProfile);
globalRouter.post(routes.setLoccode, onlyPrivate, postSetLoccode);

export default globalRouter;
