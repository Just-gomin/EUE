const SERVER_MSG_OK = "Server OK.";
const SERVER_MSG_ERROR = "The server encountered an error.";

const STATUS_CODE_OK = 200;
const STATUS_CODE_ERROR = 500;

const server_status = {
  msg: {
    ok: SERVER_MSG_OK,
    err: SERVER_MSG_ERROR,
  },
  code: {
    ok: STATUS_CODE_OK,
    err: STATUS_CODE_ERROR,
  },
};

export default server_status;
