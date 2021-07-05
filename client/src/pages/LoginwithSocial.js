import React from 'react'
import '../App.css'
import { Form, Modal, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { KAKAO_AUTH_URL } from './../components/OAuth';

function LoginwithSocial() {

    const inboxstyled = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        justifyContent: 'center',
        margin: 'auto',
        padding: '10px'

    }

    return (
        <>
            <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title id="example-modal-sizes-title-sm">
                    LOGIN
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={inboxstyled}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button type="submit" id='formbtn'>
                        LOGIN
                    </Button>
                </Form>
                <hr />
                <Row style={{ margin: 'auto', marginBottom: '5px', display: 'flex', justifyContent: 'center' }}>
                    {/* <KakaoLogin /> */}
                    <a href={KAKAO_AUTH_URL} target='_blank' id='socialLink' >
                        <Image src='/images/Kakao1.jpg' id='logpng' />
                        KAKAO
                    </a>
                    <a as='button' href="javascript:loginWithKakao()" id='socialLink'>
                        <Image src='/images/google.png' id='logpng' />
                        GOOGLE
                    </a>
                    <a as='button' href="javascript:loginWithKakao()" id='socialLink'>
                        <Image src='/images/facebook.png' id='logpng' />
                        FACEBOOK
                    </a>
                </Row>
            </Modal.Body>
        </>
    )
}

export default LoginwithSocial;