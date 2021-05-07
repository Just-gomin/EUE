import db from "../db";

const DB_QUERY_ERROR_MSG = "DB Query Error.";
const DB_CONNECTION_ERROR_MSG = "DB Connection Error.";
const SERVER_ERROR_MSG = "The server encountered an error.";
const QUERY_SUCCESS_MSG = "Query Success.";

const STATUS_OK_CODE = 200;
const STATUS_SERVER_ERROR_CODE = 500;

export const getDo = async (req, res) => {
  const query = "SELECT CODE, DONAME FROM LOCDO";

  db((connErr, connection) => {
    if (connErr) {
      console.log(DB_CONNECTION_ERROR_MSG);
      res.status(STATUS_SERVER_ERROR_CODE).json({ error: SERVER_ERROR_MSG });
    } else {
      connection.query(query, (queryErr, result) => {
        if (queryErr) {
          console.log(DB_QUERY_ERROR_MSG);
          res
            .status(STATUS_SERVER_ERROR_CODE)
            .json({ error: SERVER_ERROR_MSG });
        } else {
          console.log(QUERY_SUCCESS_MSG);
          res.status(STATUS_OK_CODE).json({ info: result });
        }
      });

      connection.release();
    }
  });
};

export const getSGG = (req, res) => {
  const {
    params: { id },
  } = req;

  const query = `SELECT CODE, SGGNAME FROM LOCSIGUNGU WHERE DOCODE = ${id}`;

  db((connErr, connection) => {
    if (connErr) {
      console.log(DB_CONNECTION_ERROR_MSG);
      res.status(STATUS_SERVER_ERROR_CODE).json({ error: SERVER_ERROR_MSG });
    } else {
      connection.query(query, (queryErr, result) => {
        if (queryErr) {
          console.log(DB_QUERY_ERROR_MSG);
          res
            .status(STATUS_SERVER_ERROR_CODE)
            .json({ error: SERVER_ERROR_MSG });
        } else {
          console.log(QUERY_SUCCESS_MSG);
          res.status(STATUS_OK_CODE).json({ info: result });
        }
      });

      connection.release();
    }
  });
};

export const getEMD = (req, res) => {
  const {
    params: { id },
  } = req;

  const query = `SELECT CODE, EMDNAME FROM LOCINFO WHERE SGGCODE = ${id}`;

  db((connErr, connection) => {
    if (connErr) {
      console.log(DB_CONNECTION_ERROR_MSG);
      res.status(STATUS_SERVER_ERROR_CODE).json({ error: SERVER_ERROR_MSG });
    } else {
      connection.query(query, (queryErr, result) => {
        if (queryErr) {
          console.log(DB_QUERY_ERROR_MSG);
          res
            .status(STATUS_SERVER_ERROR_CODE)
            .json({ error: SERVER_ERROR_MSG });
        } else {
          console.log(QUERY_SUCCESS_MSG);
          res.status(STATUS_OK_CODE).json({ info: result });
        }
      });

      connection.release();
    }
  });
};
