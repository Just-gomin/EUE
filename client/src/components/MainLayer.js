import React from 'react'
import { useState } from 'react';
import { Button, Form, Image, Row, ButtonGroup, Modal, Dropdown, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'
import SignUp from '../pages/SignUp'
import LoginwithSocial from '../pages/LoginwithSocial';
import { isLogined } from './../Utils/Auth';
import LocalCode from '../components/LocalCode';


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

    // const loginstyled = {
    //     margin: 'auto',
    //     padding: '2px',
    //     diplay: 'flex',
    //     justifyContent: 'center',
    //     borderRadius: '20px'
    // }

    // const titlesty = {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     background: 'rgb(110, 189, 142)',
    //     text: 'center'
    // }

    const [logshow, setLogshow] = useState(false);
    const [signshow, setSignshow] = useState(false);

    const user = isLogined()

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
                    {user ?
                        <Button variant='light' style={btnstyled} onClick={() => setLogshow(true)}>
                            로그아웃
                        </Button>
                        :
                        <Button variant='light' style={btnstyled} onClick={() => setLogshow(true)}>
                            로그인
                        </Button>
                    }
                    <Modal
                        size="sm"
                        show={logshow}
                        onHide={() => setLogshow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <LoginwithSocial />
                    </Modal>
                    <Button variant='light' style={btnstyled} onClick={() => setSignshow(true)}>회원가입</Button>
                    <Modal
                        size="md"
                        show={signshow}
                        onHide={() => setSignshow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <SignUp />

                    </Modal>
                </ButtonGroup>
            </Row>
            <Row className='m-auto justify-content-center w-100' id='contour'>
                |
            </Row>
        </>
    );
}

export default MainLayer