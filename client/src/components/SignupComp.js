import React, { useState } from 'react'
import '../App.css'
import { Form, Button, Row, Col, Card, Alert, FloatingLabel } from 'react-bootstrap';
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
        padding: '0.5em',
        color: 'black'
    }

    const initValues = {
        name: '',
        email: ''
    }

    const [formValues, setFormValues] = useState(initValues)
    const [validated, setValidated] = useState(false)

    const [emailSubm, setEmailSubm] = useState(false)

    const [userExist, setUserExist] = useState(false)
    const [alertShow, setAlertShow] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
        console.log('???', formValues)
    }

    function CheckUserExist() {
        localStorage.setItem('signup_username', formValues.name)
        localStorage.setItem('signup_email_Address', formValues.email)

        const signUser = localStorage.getItem('signup_username')
        const signEmail = localStorage.getItem('signup_email_Address').split('@')[1]

        if (signEmail && signUser) {
            setAlertShow(true)
            setUserExist(!userExist)
        }
        else
            if (!signEmail) {
                setAlertShow(false)
                // setUserExist(true)
            }
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

    function handleClickSubm() {
        // setEmailSubm(true);
        const subm = document.getElementById("subm-mailSent");
        subm.style.visibility = 'visible'
        // const aftermail = document.getElementById('AftermailSent');
        // aftermail.style.display = ''
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
                    </Row>

                    <Form style={inboxstyled} onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className='mb-3'
                        >
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formValues.name}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email Address"
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formValues.email}
                                onChange={handleChange}
                                required
                            />
                        </FloatingLabel>

                        <Button variant='light' className='mt-3' id='formbtn' type='submit' onClick={CheckUserExist}>
                            {/* type="submit" */}
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