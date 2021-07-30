import envs from "../config/config";

// # Global Routes
const BASE = envs.production ? "/app/eue/api" : "/api";

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
const LOGOUT = "/logout";
const CONFIRM = "/confirm";

// # User Info
const USER_INFO = "/user-info";
const TOGGLE_AIRCON = "/toggle-aircon";
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
  logout: LOGOUT,
  confirm: CONFIRM,
  userinfo: USER_INFO,
  editProfile: EDIT_PROFILE,
  toggleAircon: TOGGLE_AIRCON,
  Detail: (id) => {
    if (id) {
      return `/${id}`;
    } else {
      return DETAIL;
    }
  },
};

export default routes;
