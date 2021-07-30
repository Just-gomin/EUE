import axios from 'axios';
import Swal from 'sweetalert2'
import '../App.css'

// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const { Kakao } = window;


export function LoginWithKakao() {
    //authObj : response.data에 들어가 있는 부분 object 형식
    Kakao.Auth.loginForm({
        // 팝업 + 다른 아이디 로그인시
        scope: 'account_email, profile_nickname',
        // 추가 동의 받을 동의 항목 ID 목록, 하나의 문자열에 여러 개의 ID를 쉼표(,)로 구분하여 전달
        success: function (authObj) {
            console.log(JSON.stringify(authObj))

            Kakao.API.request({
                // 현재 로그인한 사용자의 카카오계정 정보 불러오기
                url: '/v2/user/me',
                // 사용자 정보 요청 주소
                data: {
                    property_keys: ["kakao_account.profile", "kakao_account.email"]
                    // 파라미터를 통해 특정 사용자 정보만 지정해서 요청
                },
                success: async function (response) {
                    console.log(response);
                    console.log(response.kakao_account.profile);

                    const nickValue = Object.values(response.kakao_account.profile)

                    await axios.post('/api/edit-profile', {nick_name: nickValue})
                        .then((res) => console.log('kakao', res))

                    localStorage.setItem('login', true)
                    Swal.fire({
                        title: '로그인 성공!',
                        text: '🙌 환영합니다 🙌',
                        icon: 'success',
                        customClass: 'swal-wide',
                        confirmButtonText: '확인',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            // window.location.replace('/')
                        }
                        else {
                            // window.location.replace('/')
                        }
                    })
                }
            });
        },
        fail: function (err) {
            alert(JSON.stringify(err))
            console.log(JSON.stringify(err))
        },
    }
    )
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
        localStorage.clear();
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
    })
}