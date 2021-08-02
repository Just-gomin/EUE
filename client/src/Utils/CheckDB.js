import axios from 'axios';
import { Swal } from 'sweetalert2';
import { routesClient } from './../routesClient';


export async function callUserInfo() {
    const res = await axios.get(routesClient.userinfo)
    return res.data.contents.user_info
}

export function checkCookies() {
    const acctoken_cookies = document.cookie.split('=')[1];
    return acctoken_cookies;
}

export function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    Swal.fire({
        title: '로그아웃 성공!',
        text: '🙏 안녕히 가세요 🙏',
        icon: 'warning',
        customClass: 'swal-wide',
        confirmButtonText: '확인',
    }).then((res) => {
        if (res.isConfirmed) {
            window.location.replace('/')
        }
        else {
            window.location.replace('/')
        }
    })
}