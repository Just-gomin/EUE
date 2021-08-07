import React from 'react'
import { Button, Image, Row, ButtonGroup, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'
import UserInfo from './UserInfo';
import UsingAircon from './UsingAircon';
import { isLogined, localLogout } from '../utils/Auth';
import TimeNow from './TimeNow';


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


            <Row className='d-flex justify-content-center align-items-center my-2 mx-auto w-100'>
                <ButtonGroup vertical className='m-auto' style={{ width: '100%', flexDirection: 'column' }}>

                    {isLogined() ?
                        //true
                        <Button variant='light' style={btnstyled} onClick={localLogout}>
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

                    {!isLogined() &&
                        <Button variant='light' style={btnstyled}>
                            <Link to='/signup' id='btnlink'>
                                회원가입
                            </Link>
                        </Button>
                    }

                </ButtonGroup>
                <UsingAircon />

                <TimeNow />

            </Row>
            <Row className='m-auto justify-content-center w-100' id='contour'>
                |
            </Row>
        </Col>
    );
}

export default MainLayer