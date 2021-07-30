import routes from "./routes";
import jwt from "jsonwebtoken";
import envs from "../config/config";
import resForm from "./resform";

/*
  # localmiddleware
  1. Pug Template에서 routes.js에 선언된 경로들을 사용하기 위함.
*/
export const localmiddleware = (req, res, next) => {
  res.locals.routes = routes;
  next();
};

/*
  # onlyPrivate
  - 인증된 사용자만 사용할 수 있는 데이터에 접근하기 위한 중간 과정.
*/
export const onlyPrivate = (req, res, next) => {
  const {
    cookies: { acs_token },
  } = req;

  try {
    const acs_decode = jwt.verify(acs_token, envs.secretKey.access_token);
    next();
  } catch (err) {
    console.log(err);
    res.json({ msg: resForm.msg.err, contents: { error: err } });
  }
};
