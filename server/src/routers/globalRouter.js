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
  getLogout,
  postSignup,
  getToggleAircon,
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
globalRouter.get(routes.logout, onlyPrivate, getLogout);
globalRouter.get(routes.confirm, getConfirm);

// User Info
globalRouter.get(routes.userinfo, getUserInfo);
globalRouter.post(routes.editProfile, onlyPrivate, postEditProfile);
globalRouter.get(routes.toggleAircon, onlyPrivate, getToggleAircon);

export default globalRouter;
