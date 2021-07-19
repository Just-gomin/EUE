import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import MainLayer from '../components/MainLayer';
import '../App.css'
import LoginComp from '../components/LoginComp';

function SignupPage() {
    const constyled = {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        position: 'relative'
    }

    const col1sty = {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center'
    }

    const col2sty = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0'
    }


    return (
        <Container fluid className='m-auto d-flex justify-content-center position-relative'>
            <Row style={constyled} className='m-auto'>
                <Col xs={12} md={6} className='d-flex justify-content-center' id='stickyy'>
                    <Row style={col1sty} className='m-auto'>
                        <MainLayer />
                    </Row>
                </Col>

                <Col md={6} style={col2sty}>

                    <Row style={constyled} className='d-flex mb-2 w-100'>
                        <LoginComp />
                    </Row>
                </Col>
            </Row>
        </Container>

    );
}

export default SignupPage;