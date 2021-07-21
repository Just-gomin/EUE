import React, { useState } from 'react'
import '../App.css'
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { LoginWithKakao } from '../utils/Oauth';

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
        padding: '1rem'
    }

    const initValues = {
        email: '',
        name: ''
    }

    const [formValues, setFormValues] = useState(initValues)
    const [validated, setValidated] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
    }

    function handleSubmit(event) {
        const form = event.currentTarget;
        console.log('formValues', formValues);
        console.log('formValues.values', Object.values(formValues)[0].length);

        // console.log(form)
        // if (Object.values(formValues)[0].length !== 0) { //form.checkValidity() === false
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        console.log(validated)
        setValidated(true);
        // const form = event.current
        // setFormError(validate(formValues))
        // setIsSubmit(true)
    }
    const [emailSubm, setEmailSubm] = useState(false)

    function handleClickSubm() {
        // setEmailSubm(true);
        const subm = document.getElementById("subm-mailSent");
        subm.style.visibility = 'visible'
        // const aftermail = document.getElementById('AftermailSent');
        // aftermail.style.display = ''
    }


    const [userExist, setUserExist] = useState(false)
    const [alertShow, setAlertShow] = useState(true)

    function CheckUserExist() {
        setUserExist(!userExist)
    }


    return (

        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title id='impactTitle'>
                    Create an Account
                </Card.Title>
                <Card.Subtitle style={{ fontWeight: 'lighter' }}>
                    Sign up with your social media account or email address
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
                        <Button onClick={() => setAlertShow(true)}>보여주고</Button>
                        <Button onClick={() => setAlertShow(false)}>안보여주고</Button>
                    </Row>
                    
                    <Form style={inboxstyled}
                        onSubmit={handleSubmit}>
                        <Form.Group controlId="userEmail">
                            <Row className='m-auto mb-1 d-flex justify-content-center'>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Row>
                            <Row>
                                <p></p>
                            </Row>
                            <Row className='m-auto d-flex justify-content-center'>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Row>
                        </Form.Group>

                        <Button variant='light' className='mt-2' type="submit" id='formbtn' onClick={CheckUserExist}>
                            Sign Up
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