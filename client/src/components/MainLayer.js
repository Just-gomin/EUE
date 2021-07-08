import React from 'react'
import { useState } from 'react';
import { Button, Form, Image, Row, ButtonGroup, Modal, Dropdown, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'
import SignUp from '../pages/SignUp'
import LoginwithSocial from '../pages/LoginwithSocial';

function MainLayer() {

    const boxstyled = {
        border: 'solid',
        color: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
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
        fontSize: '10px',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
        textDecorationColor: 'none',
        color: 'white'
    }

    const loginstyled = {
        margin: 'auto',
        padding: '2px',
        diplay: 'flex',
        justifyContent: 'center',
        borderRadius: '20px'
    }

    const titlesty = {
        display: 'flex',
        justifyContent: 'center',
        background: 'rgb(110, 189, 142)',
        text: 'center'
    }

    const [logshow, setLogshow] = useState(false);
    const [signshow, setSignshow] = useState(false);
    const [isLogin, setIsLogin] = useState(false)


    return (
        <>
            <Row className='d-flex align-items-center m-auto w-100'>
                <Col className='m-auto '>
                    <Link to='/' className=' m-auto'>
                        <Image src='/images/EUE11.jpg' alt='EUE' style={boxstyled} />
                    </Link>
                </Col>
                <Dropdown className='d-sm-block d-md-none' style={{ fontSize: '1em' }}
                >
                    <Dropdown.Toggle style={btnstyled} id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='z-index-10'>
                        <Dropdown.Item href="#/action-1">
                            <Button variant='light' className='w-100 m-auto' style={btnstyled} onClick={() => setLogshow(true)}>
                                LOGIN
                            </Button>
                            <Modal
                                size="sm"
                                show={logshow}
                                onHide={() => setLogshow(false)}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <LoginwithSocial />
                            </Modal>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">

                            <Button variant='light' className='w-100 m-auto' style={btnstyled} onClick={() => setSignshow(true)}>
                                SIGN UP
                            </Button>
                            <Modal
                                size="md"
                                show={signshow}
                                onHide={() => setSignshow(false)}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <SignUp />
                            </Modal>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Row>

            <Row className='d-none d-md-flex justify-content-center align-items-center my-3 mx-auto w-100'>
                <ButtonGroup vertical className='m-auto' style={{ width: '100%' }}>
                    <Button variant='light' style={btnstyled} onClick={() => setLogshow(true)}>LOGIN</Button>
                    <Modal
                        size="sm"
                        show={logshow}
                        onHide={() => setLogshow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <LoginwithSocial />

                    </Modal>

                    <Button variant='light' style={btnstyled} onClick={() => setSignshow(true)}>SIGN UP</Button>
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
        </>
    );
}

export default MainLayer