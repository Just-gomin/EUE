import db from "../db/index";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { serverMSG, statusCode } from "../serverinfo";
import routes from "../routes";

dotenv.config();

// 메일 전송 처리
const postMail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      type: "OAuth2",
      user: process.env.NODEMAILER_USER,
      clientId: process.env.NODEMAILER_GAMIL_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_GMAIL_CLIENT_PASSWORD,
      refreshToken: process.env.NODEMAILER_GMAIL_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `EUE Auth Supply <${process.env.NODEMAILER_USER}>`,
    to: email,
    subject: "EUE 사용자 계정 확인용 메일.",
    html: `<a href="${process.env.PROTOCOL}://${process.env.HOST}:${
      process.env.PORT
    }${routes.base + routes.confirm}?token=${token}">${
      process.env.PROTOCOL
    }://${process.env.HOST}:${process.env.PORT}${
      routes.base + routes.confirm
    }?token=${token}</a>`,
  };

  try {
    const mailResult = await transporter.sendMail(mailOptions);
    console.log(`Mail sent - ID : ${mailResult.messageId}`);
  } catch (err) {
    console.log("Mail Sending Failuer.");
    console.log(err);
  }
};

// Page for Development Test.
export const getSignup = (req, res) => {
  res.render("signup", { pagename: "Sign Up" });
};

// Page for Development Test.
export const getLogin = (req, res) => {
  res.render("login", { pagename: "Log In" });
};

// Page for Development Test.
export const getSetLoccode = (req, res) => {
  res.render("setLoccode", { pagename: "Set Loccode" });
};

// 회원 가입 처리
export const postSignup = async (req, res) => {
  const {
    body: { email, nick_name },
  } = req;

  const result = await db.User.findAll({
    where: { email: email },
    logging: false,
  });

  if (result.length != 0) {
    res.status(statusCode.err).json({
      msg: serverMSG.server_err,
      content: "You are aleady registered",
    });
  } else {
    db.User.create({ email: email, nick_name: nick_name }, { logging: false });
    // 로그인 페이지로 넘겨주기.
    res.redirect("/api/login");
  }
};

// 메일 확인용 토큰 발행 및 전송 처리
export const postLogin = async (req, res) => {
  const {
    body: { email },
  } = req;

  const result = await db.User.findAll({
    where: { email: email },
    logging: false,
  });

  if (result.length != 0) {
    // token 발행
    const mail_token = jwt.sign(
      {
        email: email,
      },
      process.env.AUTH_MAIL_SECRETKEY,
      {
        expiresIn: 10 * 60,
        issuer: "eue.com",
        subject: "auth_checker",
      }
    );

    // 토큰이 포함된 로그인 링크 전송
    postMail(email, mail_token);

    res
      .status(statusCode.ok)
      .json({ msg: serverMSG.server_ok, content: "Send Mail Successfully." });
  } else {
    res.status(statusCode.err).json({
      msg: serverMSG.server_err,
      content: "You are not one of our user yet.",
    });
  }
};

// 메일로 보낸 토큰의 유효성 검사 및 access 토큰 발행 처리
export const getConfirm = async (req, res) => {
  const {
    query: { token },
  } = req;

  try {
    const decoded = jwt.verify(token, process.env.AUTH_MAIL_SECRETKEY); // return payload.

    const result = await db.User.findAll({
      where: { email: decoded.email },
      logging: false,
    });
    const user = result[0];

    const payload = {
      email: user.email,
      nick_name: user.nick_name,
      loc_code: user.loc_code,
    };

    const accessT = jwt.sign(payload, process.env.AUTH_ACCESS_SECRETKEY, {
      expiresIn: "14d",
      issuer: "eue.com",
      subject: "userInfo",
    });

    res.status(statusCode.ok).cookie("acs_token", accessT).redirect("/api");
  } catch (err) {
    res
      .status(statusCode.err)
      .json({ msg: serverMSG.server_err, content: `${err}` });
  }
};

// 사용자의 지역 코드 설정 처리
export const postSetLoccode = async (req, res) => {
  const {
    cookies: { acs_token },
    body: { loccode },
  } = req;

  const decoded = jwt.decode(acs_token);
  console.log(decoded);

  await db.User.update(
    { loc_code: Number(loccode) },
    { where: { email: decoded.email }, logging: false }
  );

  const payload = {
    email: decoded.email,
    nick_name: decoded.nick_name,
    loc_code: loccode,
  };

  const accessT = jwt.sign(payload, process.env.AUTH_ACCESS_SECRETKEY, {
    expiresIn: "14d",
    issuer: "eue.com",
    subject: "userInfo",
  });

  res
    .status(statusCode.ok)
    .cookie("acs_token", accessT)
    .json({ msg: serverMSG.server_ok, content: "Successfully Set Loccode" });
};
