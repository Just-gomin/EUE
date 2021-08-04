import axios from 'axios';
import { Swal } from 'sweetalert2';
import { routesClient } from './../routesClient';

export function getTempEtc() {
    callUserInfo().then((res) => {
        const outs = axios.get(routesClient.outsideLoc + res['loc_code'])
        return outs
            .then((res) => {
                const outWeather = res.data.contents.weather_out
                console.log(res.data.contents.weather_out)
                let i = 0;
                // setTemp(res.data.contents.weather_out[0].temp)
                const tempArray = []
                for (i; i < 3; i++) {
                    console.log(i)
                    console.log(outWeather[i])
                    tempArray.push(outWeather[i].temp)
                }
                return tempArray
                // setTemp(tempArray)
            })
    })
}
export async function callUserInfo() {
    const res = await axios.get(routesClient.userinfo)
    console.log(res.data.contents.user_info)
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