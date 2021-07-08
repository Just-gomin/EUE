import axios from 'axios';
import { Spinner, Button, Col, Row } from 'react-bootstrap';
import { KAKAO_AUTH_URL } from './Oauth';
import { Link, Redirect } from 'react-router-dom';

// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Oauth() {
    const REST_API_KEY = 'a564b730d6339b084ecf7775a9a09284';
    const REDIRECT_URI = 'http://localhost:3000/oauth';

    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    console.log('인가 코드', authorizationCode);


    const kakaoAuthURl = `https://kauth.kakao.com/oauth/token`
    // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const payload = {
        grant_type: "authorization_code",
        client_id: `${REST_API_KEY}`,
        redirect_uri: `${REDIRECT_URI}`,
        code: `${authorizationCode}`
    }
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code')
    params.append('client_id', `${REST_API_KEY}`)
    params.append('redirect_uri', `${REDIRECT_URI}`)
    params.append('code', `${authorizationCode}`)
    axios.post(kakaoAuthURl, params).then(response => console.log(response))

    function locateHome() {
        window.location.replace('/')
    };
    setTimeout(locateHome, 3000)

    return (
        <Row className='d-block'>
            <Col className='text-center m-auto' style={{ fontSize: '5px' }} >
                인가코드 : {authorizationCode}
                <br />
                Params : {params}
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