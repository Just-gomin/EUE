const CLIENT_ID = 'a564b730d6339b084ecf7775a9a09284';
const REDIRECT_URI = 'http://localhost:3000/oauth';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;