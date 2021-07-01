import React from 'react'
import { useState } from 'react';
import { Button, Form, Image, Row, ButtonGroup, Modal, Dropdown, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'

function MainLayer() {

    const boxstyled = {
        border: 'solid',
        color: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
        marginBottom: '1em',
        width: '100%',
        backgroundSize: 'contain',
        margin: 'auto'
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


    return (
        <>
            <Row className='d-flex align-items-center m-auto w-100'>
                <Col className='m-auto '>
                    <Link to='/' className=' m-auto'>
                        <Image src='/images/EUE11.jpg' alt='EUE' style={boxstyled} />
                    </Link>
                </Col>
                <Dropdown className='d-sm-block d-md-none' style={{ fontSize: '1em' }}>
                    <Dropdown.Toggle style={btnstyled} id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='z-index-10'>
                        <Dropdown.Item href="#/action-1">
                            <Button className='w-100 m-auto' style={btnstyled} onClick={() => setLogshow(true)}>
                                LOGIN
                            </Button>
                            <Modal
                                size="sm"
                                show={logshow}
                                onHide={() => setLogshow(false)}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <Modal.Header className='d-flex justify-content-center'>
                                    <Modal.Title id="example-modal-sizes-title-sm">
                                        LOGIN
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form style={loginstyled}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="Enter email" />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Button variant="maingreen" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">

                            <Button className='w-100 m-auto' style={btnstyled} onClick={() => setSignshow(true)}>SIGN UP</Button>
                            <Modal
                                size="md"
                                show={signshow}
                                onHide={() => setSignshow(false)}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <Modal.Header className='d-flex justify-content-center'>
                                    <Modal.Title id="example-modal-sizes-title-sm">
                                        Sign Up
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form style={loginstyled}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="email" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Password" />
                                            <Form.Text>8글자 이상 적어주세요.</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Password Check" />
                                        </Form.Group>
                                        <Button variant="maingreen" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Row>

            <Row className='d-none d-md-flex justify-content-center align-items-center my-3 mx-auto w-100'>
                <ButtonGroup vertical className='m-auto' style={{ width: '100%' }}>
                    <Button style={btnstyled} onClick={() => setLogshow(true)}>LOGIN</Button>
                    <Modal
                        size="sm"
                        show={logshow}
                        onHide={() => setLogshow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header className='d-flex justify-content-center'>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                LOGIN
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form style={loginstyled}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="maingreen" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Button style={btnstyled} onClick={() => setSignshow(true)}>SIGN UP</Button>
                    <Modal
                        size="md"
                        show={signshow}
                        onHide={() => setSignshow(false)}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header className='d-flex justify-content-center'>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                Sign Up
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form style={loginstyled}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" />
                                    <Form.Text>8글자 이상 적어주세요.</Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password Check" />
                                </Form.Group>
                                <Button variant="maingreen" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                </ButtonGroup>
            </Row>
        </>
    );
}

export default MainLayer