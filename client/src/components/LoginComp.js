import React, { useState } from 'react';
import '../App.css'
import { Form, Button, Row, Col, Card, Alert, FloatingLabel } from 'react-bootstrap';
import { LoginWithKakao } from '../utils/Oauth';
import axios from 'axios';

function LoginComp() {

    const cardstyled = {
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '3px',
        borderRadius: '20px',
        borderColor: 'rgb(110, 189, 142)',
        color: '#04AB70'
    }

    const inboxstyled = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80%',
        justifyContent: 'center',
        margin: 'auto',
        padding: '0.5em',
        color: 'black'
    }

    const [emailSentAlert, setEmailSentAlert] = useState(false)
    const [alertShow, setAlertShow] = useState(false)

    const [emailAddress, setEmailAddress] = useState('')

    function CheckEmailSend() {
        localStorage.setItem('login_email_Address', emailAddress)
        const emailIs = localStorage.getItem('login_email_Address').split('@')[1]
        if (emailIs) {
            setAlertShow(true)
            setEmailSentAlert(false)
        }
        else {
            setAlertShow(true)
            setEmailSentAlert(true)
        }
    }

    function addressUrl() {
        const afterAt = localStorage.getItem('login_email_Address').split('@')[1]
        const newLink = 'https://www.' + afterAt;
        window.open(newLink);
    }

    function handleChange(event) {
        setEmailAddress(event.target.value)
    }

    console.log(emailAddress)

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await axios.post("/api/login", { email: emailAddress })
        console.log(res)
    }


    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title id='impactTitle'>
                    LOGIN
                </Card.Title>
                <Card.Subtitle style={{ fontWeight: 'lighter' }}>
                    Log in with your social media account or email address
                </Card.Subtitle>
                <hr />
                <Card.Text>
                    <Row className='m-auto d-flex justify-content-center' style={{ width: '80%' }}>
                        {!emailSentAlert ?
                            <Alert show={alertShow} variant={'success'}>
                                <Col>
                                    😍 이메일 전송이 완료 되었습니다.
                                </Col>
                                <Alert.Link href="" onClick={addressUrl} target='_blank' style={{ fontSize: '0.8em' }}>
                                    이메일 확인 하러가기 ➞
                                </Alert.Link>
                            </Alert>
                            :
                            <Alert show={alertShow} variant={'danger'}>
                                <Col>
                                    😭 이메일을 정확하게 적어주세요.
                                </Col>
                                <Alert.Link href="/signup" target='_blank' style={{ fontSize: '0.8em' }}>
                                    회원가입 하러가기 ➞
                                </Alert.Link>
                            </Alert>
                        }
                    </Row>

                    <Form style={inboxstyled} onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                        >
                            <Form.Control type="email" placeholder="Email" onChange={handleChange} />

                        </FloatingLabel>
                        <Button variant='light' className='mt-3' id='formbtn' onClick={CheckEmailSend} type='submit'>
                            LOGIN
                        </Button>
                    </Form>

                    <Row className='d-flex align-items-center m-2'>
                        <Col>
                            <hr />
                        </Col>
                        OR
                        <Col>
                            <hr />
                        </Col>
                    </Row>

                    <Row style={{ margin: 'auto', marginBottom: '5px', display: 'flex', justifyContent: 'center' }}>
                        <a href="#;" onClick={LoginWithKakao} id='socialLink' >
                            {/* 세미콜론이 붙으면 최상단 이동 x */}
                            <img src='http://image.kmib.co.kr/online_image/2020/0626/611514110014734788_1.jpg' id='logpng' alt='KAKAO' />
                        </a>

                    </Row>
                </Card.Text>
            </Card>

        </Row>
    )
}

export default LoginComp;