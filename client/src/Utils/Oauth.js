import axios from 'axios';
import { Spinner, Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const { Kakao } = window;

export function LoginWithKakao() {
    //authObj : response.data에 들어가 있는 부분 object 형식
    Kakao.Auth.loginForm({
        // 팝업 + 다른 아이디 로그인시
        scope: 'account_email, profile_nickname',
        // 추가 동의 받을 동의 항목 ID 목록, 하나의 문자열에 여러 개의 ID를 쉼표(,)로 구분하여 전달
        success: function (authObj) {
            alert('로그인 되었습니다. @@@@@@@@@')
            console.log(JSON.stringify(authObj))

            console.log('accT ;;', authObj.access_token)
            console.log(typeof (localStorage))
            console.log(Object.keys(localStorage)[0])

            Kakao.API.request({
                // 현재 로그인한 사용자의 카카오계정 정보 불러오기
                url: '/v2/user/me',
                // 사용자 정보 요청 주소
                data: {
                    property_keys: ["kakao_account.profile", "kakao_account.email"]
                    // 파라미터를 통해 특정 사용자 정보만 지정해서 요청
                },
                success: function (response) {
                    console.log(response);
                    console.log(response.kakao_account.profile);

                    const nickValue = Object.values(response.kakao_account.profile)
                    localStorage.setItem('nickname', nickValue)
                    const nickname = localStorage.getItem('nickname')
                    console.log(nickname)
                    window.location.replace('/' + '?nickname=' + `${nickname}`)
                }
            });
        },
        fail: function (err) {
            alert(JSON.stringify(err))
        },
    })
}

export function kakaoLogout() {
    // 토큰을 만료시켜 더 이상 해당 액세스 토큰으로 카카오 API를 호출할 수 없도록 
    console.log('geAccesToken()', Kakao.Auth.getAccessToken())
    if (!Kakao.Auth.getAccessToken()) {
        alert('Not logged in.')
        localStorage.clear();
        return;
    }
    Kakao.Auth.logout(function () {
        // 로그인 시 발급받은 토큰을 만료시키는 함수
        alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken())
        localStorage.clear();
        window.location.replace('/')
    })
}


export function Loading() {

    return (
        <Row className='d-block'>

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