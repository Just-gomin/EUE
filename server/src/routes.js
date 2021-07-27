// # Global Routes
const BASE = "/api";

// # Data Routes
const DATA = "/data";
// Data - Collector
const DATA_INPUT = "/input";
// Data - Consumer
const DATA_USER = "/user";
const DATA_OUTSIDE = "/outside";

// # Local Code Data
const LOCCODE = "/loccode";

// # Auth
const SIGNUP = "/signup";
const LOGIN = "/login";
const CONFIRM = "/confirm";

// # User Info
const USER_INFO = "/user-info";
const SET_LOCCODE = "/set-loccode";
const EDIT_PROFILE = "/edit-profile";

// # Detail Object
const DETAIL = "/:id";

const routes = {
  base: BASE,
  data: DATA,
  dataInput: DATA_INPUT,
  dataUser: DATA_USER,
  dataOutside: DATA_OUTSIDE,
  locCode: LOCCODE,
  signup: SIGNUP,
  login: LOGIN,
  confirm: CONFIRM,
  userinfo: USER_INFO,
  editProfile: EDIT_PROFILE,
  setLoccode: SET_LOCCODE,
  Detail: (id) => {
    if (id) {
      return `/${id}`;
    } else {
      return DETAIL;
    }
  },
};

export default routes;
