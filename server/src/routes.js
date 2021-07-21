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
  editProfile: EDIT_PROFILE,
  Detail: (id) => {
    if (id) {
      return `/${id}`;
    } else {
      return DETAIL;
    }
  },
};

export default routes;
