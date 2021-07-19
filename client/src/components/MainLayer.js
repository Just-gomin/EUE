import React from 'react'
import { useState } from 'react';
import { Button, Form, Image, Row, ButtonGroup, Modal, Dropdown, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import '../App.css'
import LoginComp from './LoginComp';
import { isLogined, isOauth } from '../utils/Auth';
import LocalCode from '../components/LocalCode';
// import { isOauthChecked } from './../utils/Auth';
import Oauth, { checkAuth, kakaoLogout, unlinkApp } from './../utils/Oauth';


function MainLayer() {
    const history = useHistory()

    const boxstyled = {
        border: 'solid',
        color: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
        borderWidth: '3px',
        marginBottom: '1em',
        width: '100%',
        backgroundSize: 'contain',
        margin: 'auto',
        textDecorationColor: 'none'
    }

    const btnstyled = {
        background: 'rgb(110, 189, 142)',
        margin: '1px',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '100%',
        borderWidth: '2px',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
        textDecorationColor: 'none',
        color: 'white'
    }

    const [logshow, setLogshow] = useState(false);
    const kakao_accToken = localStorage.getItem('Kakao_token')

    return (
        <>
            <Row className='d-flex align-items-center m-auto w-100'>
                <Link to='/' className=' m-auto'>
                    <Image src='/images/EUE11.jpg' alt='EUE' style={boxstyled} />
                </Link>
            </Row>

            <Row className='m-auto d-flex justify-content-center w-100'>
                <LocalCode />
            </Row>
            <Row className='d-flex justify-content-center align-items-center my-2 mx-auto w-100'>
                <ButtonGroup vertical className='m-auto' style={{ width: '100%', flexDirection: 'column' }}>
                    {kakao_accToken ?
                        //true
                        <Button variant='light' style={btnstyled} onClick={kakaoLogout}>
                            로그아웃
                        </Button>
                        :
                        //false
                        <Button variant='light' style={btnstyled}>
                            <Link to='/login' id='btnlink'>
                                로그인
                            </Link>
                        </Button>
                    }
                    <Modal
                        size="sm"
                        show={logshow}
                        onHide={() => setLogshow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <LoginComp />
                    </Modal>
                    {!kakao_accToken ?
                        <Button variant='light' style={btnstyled}>

                            <Link to='/signup' id='btnlink'>
                                회원가입
                            </Link>
                        </Button>
                        :
                        <Button variant='light' style={btnstyled} onClick={unlinkApp}>

                            연결끊기
                        </Button>

                    }

                </ButtonGroup>
            </Row>
            <Row className='m-auto justify-content-center w-100' id='contour'>
                |
            </Row>
        </>
    );
}

export default MainLayer