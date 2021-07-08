import React from 'react'
import '../App.css'
import { Form, Modal, Button, Row, Col, Image } from 'react-bootstrap';
// import { KAKAO_AUTH_URL } from '../components/Oauth';


function SignUp() {

    const inboxstyled = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80%',
        justifyContent: 'center',
        margin: 'auto',
        padding: '1rem'

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
                <Form style={inboxstyled}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Username" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email Address" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password2" placeholder="Confirm Password" />
                    </Form.Group>

                    <Button variant='light' type="submit" className='' id='formbtn'>
                        Sign Up
                    </Button>
                </Form>

                <hr />
                <Row style={{margin: 'auto', marginBottom: '5px', display: 'flex', justifyContent: 'center' }}>
                        {/* <a href={KAKAO_AUTH_URL} target='_blank' id='socialLink' >
                            <Image src='/images/Kakao1.jpg' id='logpng' />
                            KAKAO
                        </a> */}
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