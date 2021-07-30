const STATUS_CODE_OK = 200;
const STATUS_CODE_ERROR = 500;

const MSG_OK = "OK!";
const MSG_ERROR = "ERROR!";

const resForm = {
  code: {
    ok: STATUS_CODE_OK,
    err: STATUS_CODE_ERROR,
  },
  msg: {
    ok: MSG_OK,
    err: MSG_ERROR,
  },
};

export default resForm;
