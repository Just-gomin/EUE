import axios from 'axios';
import { callUserInfo, checkCookies } from './CheckDB';

export function haveLogined() {
    callUserInfo().then((res) => {
        if (res && checkCookies()) {
            return true
        }
        else {
            console.log('object')
            console.log(res)
        }
    })
}

export function isOauth(value) {
    const TFoauth = value
    return TFoauth;
}

export function isLogined() {
    const whetherlogin = localStorage.getItem('login')
    if (whetherlogin === 'false') {
        return false
    }
    else {
        return true
    }
}

export function logout() {
    localStorage.setItem('login', false)
}