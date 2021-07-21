import db from "../db/index";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { serverMSG, statusCode } from "../serverinfo";
import routes from "../routes";

dotenv.config();

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

// Function for Signup Proccess.
export const postSignup = async (req, res) => {
  const {
    body: { email, nick_name },
  } = req;

  const result = await db.User.findOne({
    where: { email: email },
    logging: false,
  });

  if (result) {
    res.status(statusCode.err).json({
      msg: serverMSG.server_err,
      content: "You are aleady registered",
    });
  } else {
    db.User.create({ email: email, nick_name: nick_name }, { logging: false });
    // 로그인 페이지로 넘겨주기.
    res.status(statusCode.ok).json({
      msg: serverMSG.server_ok,
      content: "Successfully create user.",
    });
  }
};

export const postLogin = async (req, res) => {
  const {
    body: { email },
  } = req;

  const result = await db.User.findAll({
    where: { email: email },
    logging: false,
  });

  if (result) {
    // token 발행
    const mail_token = jwt.sign(
      {
        email: email,
        nick_name: result[0]["nick_name"],
      },
      process.env.AUTH_SECRETKEY,
      {
        expiresIn: 10 * 60,
        issuer: "eue.com",
        subject: "userInfo",
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

export const getConfirm = (req, res) => {
  const {
    query: { token },
  } = req;

  console.log(`Hi, test token : ${token}`);
  res
    .status(statusCode.ok)
    .json({ msg: serverMSG.server_ok, content: `Your token is : ${token}` });
};
