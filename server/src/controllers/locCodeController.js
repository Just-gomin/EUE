import { pool as db, dbMSG } from "../db";
import { serverMSG, statusCode } from "../serverinfo";

// 각각의 지역 코드 정보를 가져오는
const getQueryResult = async (query) => {
  let isError = false;
  let result;

  try {
    const [row, fields] = await db.execute(query);
    result = row;

    console.log(dbMSG.query_success);
  } catch (error) {
    //Error Log
    console.log("", error);

    isError = true;

    // 발생한 오류가 DB와 연결 오류인지 확인 후 Error Message 지정 및 전달
    if (error.code === "ECONNREFUSED") result = dbMSG.connection_err;
    else result = dbMSG.query_err;
  }

  return [isError, result];
};

// Do Code에 대한 GET 요청 처리
export const getDo = async (req, res) => {
  const query = "SELECT CODE, DONAME FROM LOCDO";

  const [isError, result] = await getQueryResult(query);

  if (!isError) {
    res.status(statusCode.ok).json({ DO: result });
  } else {
    console.log(result);
    res.status(statusCode.err).send(serverMSG.server_err);
  }
};

// SGG Code에 대한 GET 요청 처리
export const getSGG = async (req, res) => {
  const {
    params: { id },
  } = req;

  const query = `SELECT CODE, SGGNAME FROM LOCSIGUNGU WHERE DOCODE = ${id}`;

  const [isError, result] = await getQueryResult(query);

  if (!isError) {
    res.status(statusCode.ok).json({ DO: id, SGG: result });
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

  const query = `SELECT CODE, EMDNAME FROM LOCINFO WHERE SGGCODE = ${id}`;

  const [isError, result] = await getQueryResult(query);

  if (!isError) {
    res.status(statusCode.ok).json({ SGG: id, EMD: result });
  } else {
    console.log(result);
    res.status(statusCode.err).send(serverMSG.server_err);
  }
};
