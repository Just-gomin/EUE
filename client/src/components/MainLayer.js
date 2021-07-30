import React, { useEffect, useState } from 'react'
import { Button, Image, Row, ButtonGroup, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'
import UserInfo from './UserInfo';
import { kakaoLogout } from '../utils/Oauth';
import axios from 'axios';
import { callUserInfo, deleteCookie } from '../utils/CheckDB';
import { checkCookies } from '../utils/CheckDB';


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


    const [airUsing, setAirUsing] = useState(false)

    useEffect(() => {
        callUserInfo().then((res) => {
            if (res !== []) {
                console.log(res[0])
            }
            else {
                console.log(res)
            }
        })
    }, [])


    async function airChange() {
        setAirUsing(!airUsing)

        await axios.post('/api/edit-profile', { using_aircon: !airUsing })
            .then(function (response) {
                console.log('res', response);
                callUserInfo().then((res) => {
                    if (res !== []) {
                        console.log(res[0])
                    }
                    else {
                        console.log(res)
                    }
                })
            })
            .catch(function (error) {
                console.log('err', error);
            });
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

            {checkCookies() &&
                <Form
                    key='checkbox' className="d-flex  justify-content-center w-100" style={{ flexDirection: 'row-reverse' }}>
                    <Form.Check
                        type='switch'
                        id='airconditioner'
                        label='에어컨 사용중'
                        onChange={airChange}
                        checked={airUsing}
                    />
                </Form>
            }

            <Row className='d-flex justify-content-center align-items-center my-2 mx-auto w-100'>
                <ButtonGroup vertical className='m-auto' style={{ width: '100%', flexDirection: 'column' }}>

                    {checkCookies() ?
                        //true
                        <Button variant='light' style={btnstyled} onClick={kakaoLogout}>
                            {/*  || deleteCookie('acs_token') */}
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

                    {!checkCookies() &&
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