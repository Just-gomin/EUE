import React, { useState } from 'react'
import '../App.css'
import { Form, Button, Row, Col, Card, Alert, FloatingLabel } from 'react-bootstrap';
import { LoginWithKakao } from '../utils/Oauth';
import axios from 'axios';
import { routesClient } from './../routesClient';

function SignupComp() {

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

    const initValues = {
        nick_name: '',
        email: '',
        isOauth: false
    }

    const [formValues, setFormValues] = useState(initValues)

    const [userExist, setUserExist] = useState(false)
    const [alertShow, setAlertShow] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await axios.post(routesClient.signup, formValues)
        console.log('existing_user : ', res.data.contents.existing_user)
        setUserExist(res.data.contents.existing_user)
        setAlertShow(true)
    }

    return (

        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title id='impactTitle'>
                    계정 생성하기
                </Card.Title>
                <Card.Subtitle style={{ fontWeight: 'lighter' }}>
                    이메일 또는 소셜미디어로 계정을 생성하세요
                </Card.Subtitle>
                <hr />
                <Card.Text>
                    <Row className='m-auto d-flex justify-content-center' style={{ width: '80%' }}>
                        {!userExist ?
                            <Alert show={alertShow} variant={'success'}>
                                <Col>
                                    😊 계정 생성이 완료 되었습니다.
                                </Col>
                                <Alert.Link href='/login' style={{ fontSize: '0.8em' }}>
                                    로그인 하러가기 ➞
                                </Alert.Link>
                            </Alert>
                            :
                            <Alert show={alertShow} variant={'danger'}>
                                <Col>
                                    🤔 이미 존재하는 계정입니다.
                                </Col>
                                <Alert.Link href='/login' style={{ fontSize: '0.8em' }}>
                                    로그인 하러가기 ➞
                                </Alert.Link>
                            </Alert>
                        }
                    </Row>

                    <Form style={inboxstyled} onSubmit={handleSubmit}>
                        <FloatingLabel
                            label="Nickname"
                            className='mb-3'
                        >
                            <Form.Control
                                type="text"
                                name="nick_name"
                                placeholder="Nickname"
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Email Address"
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>

                        <Button variant='light' className='mt-3' id='formbtn' type='submit'>
                            회원가입
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
                            <img src='http://image.kmib.co.kr/online_image/2020/0626/611514110014734788_1.jpg' id='logpng' alt='KAKAO' />
                        </a>
                    </Row>
                </Card.Text>
            </Card>
        </Row>
    )
}

export default SignupComp;