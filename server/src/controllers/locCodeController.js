import db from "../db/index";
import { serverMSG, statusCode } from "../serverinfo";

// Do Code에 대한 GET 요청 처리
export const getDoe = async (req, res) => {
  const result = await db.Doe.findAll({ logging: false });

  if (result) {
    res.status(statusCode.ok).json({ DO: result });
  } else {
    res.status(statusCode.err).send(serverMSG.server_err);
  }
};

// SGG Code에 대한 GET 요청 처리
export const getSGG = async (req, res) => {
  const {
    params: { id },
  } = req;

  const result = await db.Sgg.findAll({
    where: { code_doe: Number(id) },
    logging: false,
  });

  if (result) {
    res.status(statusCode.ok).json({ DO: Number(id), SGG: result });
  } else {
    console.log(result);
    res.status(statusCode.err).send(serverMSG.server_err);
  }
};

// EMD Code에 대한 GET 요청 처리
export const getEMD = async (req, res) => {
  const {
    params: { id },
  } = req;

  const result = await db.Emd.findAll({
    where: { code_sgg: Number(id) },
    logging: false,
  });

  if (result) {
    res.status(statusCode.ok).json({ SGG: Number(id), EMD: result });
  } else {
    console.log(result);
    res.status(statusCode.err).send(serverMSG.server_err);
  }
};
