import React from 'react'
import '../App.css'
import { Form, Button, Row, Col,  Card } from 'react-bootstrap';
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
                    <Form style={inboxstyled}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>

                        <Button variant='light' type="submit" id='formbtn'>
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