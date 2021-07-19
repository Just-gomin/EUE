import axios from 'axios';
import { Spinner, Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const { Kakao } = window;


export function LoginWithKakao() {
    //authObj : response.data에 들어가 있는 부분 object 형식
    Kakao.Auth.loginForm({
        scope: 'account_email',
        success: function (authObj) {
            alert('로그인 되었습니다. @@@@@@@@@')
            console.log(JSON.stringify(authObj))
            const accToken = authObj.access_token
            localStorage.setItem('Kakao_token', accToken)
            console.log('accT ;;', authObj.access_token)
            console.log(typeof (localStorage))
            console.log(Object.keys(localStorage)[0])
            Kakao.API.request({
                url: '/v2/user/me',
                data: {
                    property_keys: ["kakao_account.email"]
                },
                success: function (response) {
                    console.log(response);
                    console.log(response.kakao_account.email);

                    const userEmail = response.kakao_account.email.split('@')[0];
                    localStorage.setItem('user_email', userEmail)
                    const user_email = localStorage.getItem('user_email')
                    console.log(user_email)
                    // window.location.replace('/' + '?kakaoemail='+ `${user_email}`)
                }

            });



        },
        fail: function (err) {
            alert(JSON.stringify(err))

        },
    })


}

export function kakaoLogout() {
    if (!Kakao.Auth.getAccessToken()) {
        alert('Not logged in.')
        localStorage.clear();
        window.location.replace('/')
        return
    }
    Kakao.Auth.logout(function () {
        alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken())
        localStorage.clear();
        window.location.replace('/')

    })

}

export function unlinkApp() {
    Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (res) {
            alert('success: ' + JSON.stringify(res))
            window.location.replace('/')

        },
        fail: function (err) {
            alert('fail: ' + JSON.stringify(err))
            window.location.replace('/')

        },

    })

}

function Oauth() {
    const history = useHistory()
    const REST_API_KEY = 'a564b730d6339b084ecf7775a9a09284';
    const REDIRECT_URI = 'http://localhost:3000/oauth';
    const LOGOUT_REDIRECT_URI = 'http://localhost:3000/logout'

    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    console.log('인가 코드', authorizationCode);


    const kakaoAuthURl = `https://kauth.kakao.com/oauth/token`
    // const kakaoAuthURl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    // const payload = {
    //     grant_type: "authorization_code",
    //     client_id: `${REST_API_KEY}`,
    //     redirect_uri: `${REDIRECT_URI}`,
    //     code: `${authorizationCode}`
    // }


    const params = new URLSearchParams();
    // PAYLOAD
    params.append('grant_type', 'authorization_code')
    params.append('client_id', `${REST_API_KEY}`)
    params.append('redirect_uri', `${REDIRECT_URI}`)
    params.append('code', `${authorizationCode}`)

    axios.post(kakaoAuthURl, params).then(response => {
        console.log('RES_DATA ;;;', response.data);
        console.log('acc_token ;;', response.data.access_token);
        const accToken = response.data.access_token;
        if (accToken) {
            console.log('YES login!!!!!!!!!!!!!');
            localStorage.setItem('Kakao_token', accToken)
            history.push('/')
        }
    })






    // const res = axios.post(kakaoAuthURl, params)
    // console.log(res)
    // const accessToken = res.data
    // console.log(accessToken)

    // setTimeout(window.location.replace('/'), 3000)


    // const ischecked = () => {
    //     if (checkAuth) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }

    // }
    // console.log(ischecked())

    // const isOauthChecked = () => {
    //     if (checkAuth.access_token) {
    //         console.log(true)
    //         return true;
    //     }
    // }

    //     {
    //     console.log('accccc', response.data.access_token);
    //     console.log('%%%', response.data);
    //     if (response.data.access_token) {
    //         console.log('YES login!!!!!!!!!!!!!');
    //         isOauth(true)
    //         console.log('@@@12', isOauth(true))
    //         setTimeout(window.location.replace('/'), 3000)
    //     }
    //     else {
    //         isOauth(false)
    //     }
    // })

    return (
        <Row className='d-block'>
            <Col className='text-center m-auto' style={{ fontSize: '5px' }} >
                {/* 인가코드 : {authorizationCode}
                <br />
                Params : {params} */}
            </Col>
            <Button id='formbtn' className='d-flex justify-content-center align-items-center m-auto' style={{ width: '200px', height: '200px', flexDirection: 'column' }} disabled>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <br />
                Loading...
            </Button>
        </Row>
    )
}

export default Oauth;