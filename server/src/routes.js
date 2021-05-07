// # Global Routes
const HOME = "/";

// # Data Routes
const DATA = "/data";
// Data - Collector
const DATA_INPUT = "/input";
// Data - Consumer
const DATA_USER = "/user";
const DATA_OUTSIDE = "/outside";

// # Local Code Data
const LOCCODE = "/loccode";
const DO = "/do";
const SIGUNGU = "/si-gun-gu";
const EUPMYEONDONG = "/eup-myeon-dong";

// # Auth
const REGISTER = "/register";
const LOGIN = "/login";
const EDIT_PROFILE = "/edit-profile";

// # Detail Object
const DETAIL = "/:id";

const routes = {
  home: HOME,
  data: DATA,
  dataInput: DATA_INPUT,
  dataUser: DATA_USER,
  dataOutside: DATA_OUTSIDE,
  locCode: LOCCODE,
  do: DO,
  sigungu: SIGUNGU,
  eupmyeondong: EUPMYEONDONG,
  register: REGISTER,
  login: LOGIN,
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
