import axios from "axios";
import Swal from "sweetalert2";
import { routesClient } from './../routesClient';


export function isLogined() {
  const whetherlogin = localStorage.getItem("login");
  if (whetherlogin === "false") {
    return false;
  } else {
    return true;
  }
}

export async function localLogout() {
  await axios.get(routesClient.logout).then(function () {
    localStorage.clear();
    Swal.fire({
      title: "로그아웃 성공!",
      text: "🙏 안녕히 가세요 🙏",
      icon: "warning",
      customClass: "swal-wide",
      confirmButtonText: "확인",
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.replace("/");
      } else {
        window.location.replace("/");
      }
    });
  });
}
