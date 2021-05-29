import routes from "./routes";

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
  - Front-end 개발과 함께 진행 예정
*/
export const onlyPrivate = (req, res, next) => {
  next();
};
