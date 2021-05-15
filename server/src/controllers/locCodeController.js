import { getPoolConnection as db, dbMSG } from "../db";
import { serverMSG, statusCode } from "../serverinfo";

export const getDo = async (req, res) => {
  const query = "SELECT CODE, DONAME FROM LOCDO";

  db((connErr, connection) => {
    if (connErr) {
      console.log(dbMSG.connection_err);
      res.status(statusCode.err).json({ error: serverMSG.server_err });
    } else {
      connection.query(query, (queryErr, result) => {
        if (queryErr) {
          console.log(dbMSG.query_err);
          res.status(statusCode.err).json({ error: serverMSG.server_err });
        } else {
          console.log(dbMSG.query_success);
          res.status(statusCode.ok).json({ info: result });
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
      console.log(dbMSG.connection_err);
      res.status(statusCode.err).json({ error: serverMSG.server_err });
    } else {
      connection.query(query, (queryErr, result) => {
        if (queryErr) {
          console.log(dbMSG.query_err);
          res.status(statusCode.err).json({ error: serverMSG.server_err });
        } else {
          console.log(dbMSG.query_success);
          res.status(statusCode.ok).json({ info: result });
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
      console.log(dbMSG.connection_err);
      res.status(statusCode.err).json({ error: serverMSG.server_err });
    } else {
      connection.query(query, (queryErr, result) => {
        if (queryErr) {
          console.log(dbMSG.query_err);
          res.status(statusCode.err).json({ error: serverMSG.server_err });
        } else {
          console.log(dbMSG.query_success);
          res.status(statusCode.ok).json({ info: result });
        }
      });

      connection.release();
    }
  });
};
