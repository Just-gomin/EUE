import React, { useEffect, useState } from 'react'
import { Button, Image, Row, ButtonGroup, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'
import UserInfo from './UserInfo';
import { kakaoLogout } from '../utils/Oauth';
import axios from 'axios';
import { Swal } from 'sweetalert2';


function MainLayer() {

    const boxstyled = {
        border: 'solid',
        color: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
        borderWidth: '3px',
        width: '100%',
        backgroundSize: 'contain',
        textDecorationColor: 'none'
    }

    const btnstyled = {
        background: 'rgb(110, 189, 142)',
        margin: 'auto',
        marginBottom: '0.5em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '2px',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
        textDecorationColor: 'none',
        color: 'white'
    }

    const acctoken_cookies = document.cookie.split('=')[1];
    // console.log(acctoken_cookies)

    const logined = localStorage.getItem('nickname')
    const [airUsing, setAirUsing] = useState(false)

    function aircondiCheck() {
        setAirUsing(!airUsing)
        localStorage.setItem('using-aircondition', !airUsing);
    }

    useEffect(() => {
        const airUsingLocal = localStorage.getItem('using-aircondition')
        if (airUsingLocal === 'true') {
            return setAirUsing(true)
        }
        else {
            return setAirUsing(false)
        }
    });

    var deleteCookie = function (name) {
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


    return (
        <Col>
            <Row className='d-flex align-items-center m-auto w-100 p-0'>
                <Link to='/' className='p-0 m-auto'>
                    <Image src='/images/EUE11.jpg' alt='EUE' style={boxstyled} />
                </Link>
            </Row>

            <Row className='m-auto d-flex justify-content-center w-100'>
                <UserInfo />
            </Row>

            {acctoken_cookies &&
                <Form
                    key='checkbox' className="d-flex  justify-content-center w-100" style={{ flexDirection: 'row-reverse' }}>
                    <Form.Check
                        type='switch'
                        id='airconditioner'
                        label='에어컨 사용중'
                        onChange={aircondiCheck}
                        checked={airUsing}
                    />
                </Form>
            }

            <Row className='d-flex justify-content-center align-items-center my-2 mx-auto w-100'>
                <ButtonGroup vertical className='m-auto' style={{ width: '100%', flexDirection: 'column' }}>
                    {acctoken_cookies ?
                        //true
                        <Button variant='light' style={btnstyled} onClick={kakaoLogout || deleteCookie('acs_token')}>
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
                    {!acctoken_cookies &&
                        <Button variant='light' style={btnstyled}>
                            <Link to='/signup' id='btnlink'>
                                회원가입
                            </Link>
                        </Button>
                    }

                </ButtonGroup>
            </Row>
            <Row className='m-auto justify-content-center w-100' id='contour'>
                |
            </Row>
        </Col>
    );
}

export default MainLayer