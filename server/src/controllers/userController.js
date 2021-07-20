import db from "../db/index";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { serverMSG, statusCode } from "../serverinfo";

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
    text: `You enter locCode : ${locCode}.`,
  };

  try {
    const mailResult = await transporter.sendMail(mailOptions);
    console.log(`Mail sent - ID : ${mailResult.messageId}`);
    res
      .status(statusCode.ok)
      .json({ msg: serverMSG.server_ok, content: mailResult.response });
  } catch (err) {
    console.log("Mail Sending Failuer.");
    console.log(err);
    res
      .status(statusCode.err)
      .json({ msg: serverMSG.server_err, content: err });
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
    body: { email, locCode },
  } = req;

  const result = db.User.findOne({
    where: { email: email },
    logging: false,
  });

  if (result) {
    res.status(statusCode.err).json({
      msg: serverMSG.server_err,
      content: "You are aleady registered",
    });
  } else {
    db.User.create({ email: email, locCode: locCode }, { logging: false });
    // 로그인 페이지로 넘겨주기.
  }
};

export const postLogin = (req, res) => {
  const {
    body: { email },
  } = req;

  const result = db.User.findOne({
    where: { email: email },
    logging: false,
  });

  if (result) {
    // token 발행
    const token = "ex Token";
    // 토큰이 포함된 로그인 링크 전송
    postLogin(email, token);
    res
      .status(statusCode.ok)
      .json({ msg: serverMSG.server_ok, content: "Send Mail Successfully." });
  } else {
    res
      .status(statusCode.err)
      .json({
        msg: serverMSG.server_err,
        content: "You are still not our user.",
      });
  }
};
