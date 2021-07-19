import React, { useEffect, useState } from 'react'
import '../App.css'
import { Form, Modal, Button, Row, Col, Image, DropdownButton, ButtonGroup, Dropdown, Card } from 'react-bootstrap';
// import { KAKAO_AUTH_URL } from '../components/Oauth';
import { handleLogin } from '../utils/Auth';
import { isOauth } from '../utils/Auth';

function SignupComp() {

    const noticestyled = {
        display: 'flex',
        justifyContent: 'center',
        color: 'gray',
        margin: 'auto',
        fontSize: '0.8em',
        visibility: 'hidden',
    }

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

    const btnstyled2 = {
        background: 'white',
        margin: '1px',
        maxWidth: 'fit-content',
        borderWidth: '2px',
        color: 'rgb(110, 189, 142)',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px'
    }

    const inboxstyled = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        justifyContent: 'center',
        margin: 'auto',
        padding: '1rem'
    }

    const aftershow = {
        display : 'none'
    }

    function loginWithKakao() {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/oauth'
        })
    }

    const initValues = {
        email: '',
        authNumber: '',
    }

    const [formValues, setFormValues] = useState(initValues)
    const [formError, setFormError] = useState({})
    const [validated, setValidated] = useState(false)

    function submitForm() {
        console.log('formValues', formValues);
        console.log(!formValues['username']);
        console.log(!formValues['email']);
        console.log('Error', formError)
    }

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


    // if (success) {
    //     alert('회원가입 되었습니다.')
    //     return <Redirect to='/user' />
    // }

    const [emailSubm, setEmailSubm] = useState(false)
    const [authCodecheck, setAuthCodecheck] = useState(false)
    const [locCodeShow, setLocCodeShow] = useState(false)

    function handleClickSubm() {
        // setEmailSubm(true);
        const subm = document.getElementById("subm-mailSent");
        subm.style.visibility = 'visible'
        const aftermail = document.getElementById('AftermailSent');
        aftermail.style.display = ''
    }

    function handleClickAuth() {
        var authToInt = parseInt(formValues.authNumber, 10)
        if (authToInt == 0) {
            setAuthCodecheck(true);
            const auth = document.getElementById('auth-check')
            auth.style.visibility = 'visible'
        }
        else {
            setAuthCodecheck(false);
        }
        console.log(typeof (authToInt))
        console.log(authToInt)
    }

    function handleClickLoc() {
        setLocCodeShow(true);
        const auth = document.getElementById('loc-code')
        auth.style.visibility = 'visible'
    }
    console.log(emailSubm);
    // console.log

    // const [isOauth, setIsOauth] = useState(false)
    const iiiiioauthhh = true

    return (
        
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title>
                    Create an Account
                </Card.Title>
                <Card.Subtitle style={{ fontWeight: 'lighter' }}>
                    Sign up with your social media account or email address
                </Card.Subtitle>
                <hr />
                <Card.Text>
                    <Form style={inboxstyled}
                        onSubmit={handleSubmit}>
                        {/* isOauth */}
                        {iiiiioauthhh ?
                            <>
                                <Form.Group controlId="userEmail" className='mb-1'>
                                    <Row className='m-auto d-flex justify-content-center'>
                                        <Col md={9} xs={9}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={formValues.email}
                                                onChange={handleChange}
                                                readOnly={emailSubm}
                                                required
                                            />
                                        </Col>
                                        <Col md={3} xs={3} className='p-0 d-flex justify-content-center'>
                                            <Button variant='light' type='submit' style={btnstyled2} onClick={!emailSubm && handleClickSubm} disabled={emailSubm}>{emailSubm ? '제출완료' : '제출'}</Button>
                                        </Col>
                                    </Row>
                                    <Row style={noticestyled} id="subm-mailSent">
                                        메일이 발송되었습니다.
                                    </Row>
                                </Form.Group>

                                <Form.Group controlId="authNumber" className='mb-1' style={aftershow} id='AftermailSent'>
                                    <Row className='m-auto d-flex justify-content-center'>
                                        <Col md={9} xs={9}>
                                            <Form.Control
                                                type="text"
                                                name="authNumber"
                                                placeholder="인증코드"
                                                value={formValues.authNumber}
                                                onChange={handleChange}
                                                // readOnly={authCodecheck}
                                                required
                                            />
                                        </Col>
                                        <Col md={3} xs={3} className='p-0 d-flex justify-content-center'>
                                            <Button variant='light' style={btnstyled2} onClick={!authCodecheck && handleClickAuth}>확인</Button>
                                        </Col>
                                    </Row>
                                    <Row style={noticestyled} id='auth-check'>
                                        인증이
                                    </Row>
                                </Form.Group>
                            </>
                            :
                            <Row>
                                암것도안나와~
                            </Row>
                        }


                        <Row className='m-auto w-100 d-flex justify-content-center'>
                            <Col md={12} xs={12} style={{ padding: '0', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                {['도', '시군구', '읍면동'].map((localname) => (
                                    <DropdownButton
                                        variant='light'
                                        style={btnstyled2}
                                        title='지역코드'
                                        as={ButtonGroup}
                                        title={` ${localname} `}
                                    >
                                        <Dropdown.Item>Action</Dropdown.Item>
                                        <Dropdown.Item>Another action</Dropdown.Item>
                                        <Dropdown.Item>Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>Separated link</Dropdown.Item>
                                    </DropdownButton>
                                ))}
                                <Button variant='light' style={btnstyled2} onClick={!locCodeShow && handleClickLoc}>확인</Button>
                            </Col>
                            <Col md={6} xs={4} id='loc-code' style={{
                                margin: '5px',
                                border: 'solid',
                                borderColor: 'rgb(110, 189, 142)',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '2px',
                                visibility: 'hidden',
                                transition: 'all 4s'
                            }}>
                                지역코드
                            </Col>
                        </Row>

                        <Button variant='light' className='mt-2' type="submit" id='formbtn'>
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
                </Card.Text>
            </Card>
        </Row>
    )
}

export default SignupComp;