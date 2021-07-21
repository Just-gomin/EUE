import React, { useState } from 'react'
import '../App.css'
import { Form,  Button, Row, Col, Card } from 'react-bootstrap';
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


    // console.log(emailSubm);


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
                                    // readOnly={emailSubm}
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
                                    readOnly={emailSubm}
                                    required
                                />
                            </Row>

                        </Form.Group>


                        {/* 
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
                        </Row> */}

                        <Button variant='light' className='mt-2' type="submit" id='formbtn'>
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
                            {/* 세미콜론이 붙으면 최상단 이동 x */}
                            <img src='http://image.kmib.co.kr/online_image/2020/0626/611514110014734788_1.jpg' id='logpng' alt='KAKAO' />
                        </a>
                    </Row>
                </Card.Text>
            </Card>
        </Row>
    )
}

export default SignupComp;