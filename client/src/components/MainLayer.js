import React, { useEffect, useState } from 'react'
import { Button, Image, Row, ButtonGroup, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'
import UserInfo from './UserInfo';
import { kakaoLogout } from '../utils/Oauth';


function MainLayer() {

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

    const logined = localStorage.getItem('nickname')
    const [airUsing, setAirUsing] = useState(false)

    function aircondiCheck() {
        setAirUsing(!airUsing)
        localStorage.setItem('using-aircondition', !airUsing);
    }

    useEffect(() => {
        const airUsingLocal = localStorage.getItem('using-aircondition')
        if (airUsingLocal === 'true') {
            console.log('!!', airUsing);
            console.log(airUsingLocal);
            return setAirUsing(true)
        }
        else {
            console.log('%%', airUsing);
            console.log(airUsingLocal);
            return setAirUsing(false)
        }
    });

    return (
        <Col>
            <Row className='d-flex align-items-center m-auto w-100'>
                <Link to='/' className=' m-auto'>
                    <Image src='/images/EUE11.jpg' alt='EUE' style={boxstyled} />
                </Link>
            </Row>

            <Row className='m-auto d-flex justify-content-center w-100'>
                <UserInfo />
            </Row>

            {logined &&
                <Form
                    key='checkbox' className="d-flex  justify-content-center w-100" style={{ flexDirection: 'row-reverse' }}>
                    <Form.Check
                        type='switch'
                        id='aircondition-checkbox'
                        label='에어컨 사용중'
                        onChange={aircondiCheck}
                        checked={airUsing}
                    />
                </Form>
            }

            <Row className='d-flex justify-content-center align-items-center my-2 mx-auto w-100'>
                <ButtonGroup vertical className='m-auto' style={{ width: '100%', flexDirection: 'column' }}>
                    {logined ?
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
                    {!logined &&
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