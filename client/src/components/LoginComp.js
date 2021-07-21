import React, { useState } from 'react';
import '../App.css'
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { LoginWithKakao } from '../utils/Oauth';

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
        padding: '10px'
    }

    const [emailSent, setEmailSent] = useState(false)
    const [alertShow, setAlertShow] = useState(true)

    function CheckEmailSend() {
        setEmailSent(!emailSent)
        localStorage.setItem('Email-Address', emailAddress)
    }

    const [emailAddress, setEmailAddress] = useState('')

    function handleChange(event) {
        setEmailAddress(event.target.value)
        console.log(emailAddress)
    }

    const 
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
                        {!emailSent ?
                            <Alert show={alertShow} variant={'success'}>
                                <Col>
                                    😍 이메일 전송이 완료 되었습니다.
                                </Col>
                                <Alert.Link href='/' target='_blank' style={{ fontSize: '0.8em' }}>
                                    이메일 확인 하러가기 ➞
                                </Alert.Link>
                            </Alert>
                            :
                            <Alert show={alertShow} variant={'danger'}>
                                <Col>
                                    😭 이메일을 정확하게 적어주세요.
                                </Col>
                            </Alert>
                        }
                        <Button onClick={() => setAlertShow(true)}>보여주고</Button>
                        <Button onClick={() => setAlertShow(false)}>안보여주고</Button>
                    </Row>
                    <Form style={inboxstyled}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email" onChange={handleChange} />
                        </Form.Group>
                        <Button variant='light' type="submit" id='formbtn' onClick={CheckEmailSend}>
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