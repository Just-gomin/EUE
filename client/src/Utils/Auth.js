import axios from 'axios';

export function handleLogin({ userId, role, name, tel, email }) {
    localStorage.setItem('id', userId)
    localStorage.setItem('role', role)
    localStorage.setItem('name', name)
    localStorage.setItem('tel', tel)
    localStorage.setItem('email', email)
}

export async function handleLogout() {
    localStorage.clear()
    await axios.get('/api/auth/logout')
    window.location.href = '/'
}

export function isLogined() {
    const userId = localStorage.getItem('nickname')
    if (userId) {
        return userId
    } else {
        return false
    }
}

export function isAdmin() {
    const role = localStorage.getItem('role')
    if (role === 'admin') {
        return true
    } else {
        return false
    }
}


export function isOauth(value) {
    const TFoauth = value
    return TFoauth;
}

// export async function doeCode() {
//     const response = await axios.get('http://175.125.254.72:8090/api/data/loccode')

//     // console.log('res::', response.data.locCodes)

//     const resData = response.data.locCodes
//     const doe = resData.DOE
//     // console.log('dd', doe) //object
//     // console.log('dd::', doe[doe.length-1])
//     // console.log('values::', Object.values(doe))
//     const doeValue = Object.values(doe)
//     // console.log('@@@11', doeValue[0]['code_doe'], typeof(doeValue[0]['code_doe']))
//     // console.log('@@@22', doeValue[0]['name_doe'], typeof(doeValue[0]['name_doe']))

//     return doeValue
// }