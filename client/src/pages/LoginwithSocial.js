import React from 'react'
import '../App.css'
import { Form, Modal, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import Oauth from '../components/Oauth';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function LoginwithSocial() {

    const inboxstyled = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        justifyContent: 'center',
        margin: 'auto',
        padding: '10px'

    }

    function loginWithKakao() {
        window.Kakao.Auth.authorize({
          redirectUri: 'http://localhost:3000/oauth'
        })
    }
    const [isLogin, setIsLogin] = useState(false)

    return (
        <Row className='m-auto'>
            <Modal.Header className='d-flex justify-content-center w-100'>
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
                    <Button variant='light' type="submit" id='formbtn'>
                        LOGIN
                    </Button>
                </Form>
                <hr />
                <Row style={{ margin: 'auto', marginBottom: '5px', display: 'flex', justifyContent: 'center' }}>
                    <a href="#" onClick={loginWithKakao} id='socialLink' >
                        <img src='/images/Kakao1.jpg' id='logpng' />
                        KAKAO
                    </a>
                    <a href="javascript:loginWithKakao()" id='socialLink' >
                        <img src='/images/Kakao1.jpg' id='logpng' />
                        KAKAOHTML
                    </a>
                    <a href="javascript:loginWithKakaoPOP()" id='socialLink' >
                        <img src='/images/Kakao1.jpg' id='logpng' />
                        KAKAOPOP
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
        </Row>
    )
}

export default LoginwithSocial;