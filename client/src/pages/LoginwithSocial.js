import React from 'react'
import '../App.css'
import { Form, Modal, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import Oauth, { LoginWithKakao } from '../utils/Oauth';
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

    function loginWithKakao2() {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/oauth'
          })
        }

    // useEffect(()=> {
    //     window.location.replace('/')

    // },[localStorage.getItem('Kakao_token')])


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
                    <a href="#" onClick={loginWithKakao2} id='socialLink' >
                        <img src='/images/Kakao1.jpg' id='logpng' />
                        KAKAO
                    </a>
                    <a href="#;" onClick={LoginWithKakao} id='socialLink' >
                        {/* 세미콜론이 붙으면 최상단 이동 x */}
                        <img src='/images/Kakao1.jpg' id='logpng' />
                        KAKAOHTML
                    </a>
                   
                </Row>
            </Modal.Body>
        </Row>
    )
}

export default LoginwithSocial;