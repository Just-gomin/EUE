import db from "../db/index";
import envs from "../../config/config";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import resForm from "../resForm";
import routes from "../routes";

// 메일 전송 처리
const postMail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: envs.api.nodemailer.service,
    auth: {
      type: "OAuth2",
      user: envs.api.nodemailer.user,
      clientId: envs.api.nodemailer.gmail_client_id,
      clientSecret: envs.api.nodemailer.gmail_client_secret,
      refreshToken: envs.api.nodemailer.gmail_refresh_token,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `EUE Auth Supply <${envs.api.nodemailer.user}>`,
    to: email,
    subject: "EUE 사용자 계정 확인용 메일.",
    html: `<a href="${envs.server.protocol}://${envs.server.host}:${
      envs.server.port
    }${routes.base + routes.confirm}?token=${token}">${
      envs.server.protocol
    }://${envs.server.host}:${envs.server.port}${
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
export const getEditProfile = (req, res) => {
  res.render("edit-profile", { pagename: "Edit Profile" });
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
    res.json({ msg: resForm.msg.err, contents: { existing_user: true } });
  } else {
    db.User.create({ email: email, nick_name: nick_name }, { logging: false });
    res.json({ msg: resForm.msg.ok, contents: { existing_user: false } });
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
    try {
      // token 발행
      const mail_token = jwt.sign(
        {
          email: email,
        },
        envs.secretKey.mail,
        {
          expiresIn: 10 * 60,
          issuer: "eue.com",
          subject: "auth_checker",
        }
      );

      // 토큰이 포함된 로그인 링크 전송
      postMail(email, mail_token);

      res.json({
        msg: resForm.msg.ok,
        contents: { existing_user: true, mail_sending: true },
      });
    } catch (err) {
      console.log(err);
      res.json({
        msg: resForm.msg.err,
        contents: { existing_user: true, mail_sending: false, error: err },
      });
    }
  } else {
    res.json({
      msg: resForm.msg.err,
      contents: { existing_user: false, mail_sending: false },
    });
  }
};

// 메일로 보낸 토큰의 유효성 검사 및 access 토큰 발행 처리
export const getConfirm = async (req, res) => {
  const {
    query: { token },
  } = req;

  try {
    const decoded = jwt.verify(token, envs.secretKey.mail); // return payload.

    const result = await db.User.findAll({
      where: { email: decoded.email },
      logging: false,
    });
    const user = result[0];

    const payload = {
      email: user.email,
    };

    const accessT = jwt.sign(payload, envs.secretKey.access_token, {
      expiresIn: "14d",
      issuer: "eue.com",
      subject: "userInfo",
    });

    res
      .cookie("acs_token", accessT)
      .redirect(`${envs.client.host}:${envs.client.port}`);
  } catch (err) {
    res.json({ msg: resForm.msg.err, contents: { error: err } });
  }
};

// 사용자 정보 요청 처리
export const getUserInfo = async (req, res) => {
  const {
    cookies: { acs_token },
  } = req;

  const decoded = jwt.decode(acs_token);

  const result = await db.User.findAll({ where: { email: decoded.email } });

  res.status(resForm.code.ok).json({ user_info: result });
};

// 사용자 정보 수정 요청 처리
export const postEditProfile = async (req, res) => {
  const {
    cookies: { acs_token },
    body: { nick_name, loc_code, using_aircon },
  } = req;

  const decoded = jwt.decode(acs_token);

  await db.User.update(
    { nick_name: nick_name, loc_code: loc_code, using_aircon },
    { where: { email: decoded.email } }
  );

  const result = await db.User.findAll({ where: { email: decoded.email } });

  res.json({ msg: resForm.msg.ok, contents: { user_info: result } });
};
