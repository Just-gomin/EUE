import React, { useState } from 'react'
import '../App.css'
import { Form, Modal, Button, Row, Col, Image } from 'react-bootstrap';
// import { KAKAO_AUTH_URL } from '../components/Oauth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import catchErrors from './../Utils/CatchError';


function SignUp() {

    const inboxstyled = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80%',
        justifyContent: 'center',
        margin: 'auto',
        padding: '1rem'
    }
    function loginWithKakao() {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/oauth'
        })
    }

    const INIT_USER = {
        username: '',
        email: '',
        password: '',
        password2: '',
    }


    const [user, setUser] = useState(INIT_USER)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [validated, setValidated] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget;
        // 이벤트핸들러가 부착된 것을 의미
        console.log(form)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        try {
            setError('')
            const response = await axios.post('/api/users/signup', user)
            setSuccess(true)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function checkPassword(event) {
        const p1 = user.password
        const p2 = user.password2
        if (p1 !== p2) {
            event.preventDefault();
            //기본적으로 정의된 이벤트 작동 제한
            event.stopPropagation();
            //부모태그로부터 이벤트의 전파 멈춤
            alert('비밀번호가 일치하지 않습니다.')
            return false
        } else {
            return true
        }
    }

    if (success) {
        alert('회원가입 되었습니다.')
        return <Redirect to='/user' />
    }


    return (
        <>
            <Modal.Header className='d-block text-center'>
                <Modal.Title>
                    Create an Account
                </Modal.Title>
                <p style={{ color: 'gray', margin: '10px', fontSize: '0.5em' }}>
                    Sign up with your social media account or email address
                </p>

            </Modal.Header>

            <Modal.Body>
                <Form style={inboxstyled}
                    noValidate validated={validated}
                    onSubmit={handleSubmit}

                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBsicPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            name="password2"
                            placeholder="Confirm Password"
                            value={user.password2}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant='light' type="submit" id='formbtn' onClick={checkPassword}>
                        Sign Up
                    </Button>
                </Form>




                <hr />
                <Row style={{ margin: 'auto', marginBottom: '5px', display: 'flex', justifyContent: 'center' }}>
                    <a href="#" onClick={loginWithKakao} id='socialLink' >
                        <img src='/images/Kakao1.jpg' id='logpng' />
                        KAKAO
                    </a>
                    <a href="javascript:loginWithKakao()" id='socialLink'>
                        <Image src='/images/google.png' id='logpng' />
                        GOOGLE
                    </a>
                    <a href="javascript:loginWithKakao()" id='socialLink'>
                        <Image src='/images/facebook.png' id='logpng' />
                        FACEBOOK
                    </a>
                </Row>
            </Modal.Body>

        </>
    )
}

export default SignUp;