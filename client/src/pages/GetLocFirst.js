import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap';
import MainLayer from '../components/MainLayer';
import TimeNow from './../components/TimeNow';
import '../App.css'
import EueSuggest from '../components/EueSuggest';
import ChartLine from '../components/ChartLine';
import ChartDoughnut from '../components/ChartDoughnut';
import Donation from '../components/Donation';
import LocCodeChange from '../components/LocCodeChange';
import { callUserInfo } from '../utils/CheckDB';

function GetLocFirst() {
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

    const [existLoc, setExistLoc] = useState('')
    const [show, setShow] = useState(false)


    useEffect(() => {
        callUserInfo().then((res) => {
            setExistLoc(res[0]['loc_code'])
        })
    }, [])

    useEffect(() => {
        if (existLoc === '') {
            setTimeout(function () {
                setShow(true)
            }, 1500)
        }
        else {
            setShow(false)
            window.location.replace('/')
        }
    }, [existLoc])


    return (
        <Container className='m-auto d-flex position-relative'
            style={{ flexDirection: 'column' }} fluid>
            <Row className='d-flex'>
                <Row style={constyled} className='m-auto'>
                    <Col xs={12} md={6} className='d-flex justify-content-center' id='stickyy'>
                        <Row style={col1sty} className='m-auto'>
                            <MainLayer />
                        </Row>
                    </Col>

                    <Col md={6} style={col2sty}>
                        <TimeNow />
                        <EueSuggest />
                        <ChartLine />
                        <ChartDoughnut />
                        <Donation />
                    </Col>

                    <Modal
                        show={show}
                        backdrop="static"
                        style={{ marginTop: '10%' }}>
                        <Modal.Header className='d-flex justify-content-center top-10'>
                            <Modal.Title>EUE에 오신걸 환영합니다</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='d-flex justify-content-center top-10'>
                            <LocCodeChange />
                        </Modal.Body>
                    </Modal>
                </Row>
            </Row>
        </Container>
    );
}


export default GetLocFirst;