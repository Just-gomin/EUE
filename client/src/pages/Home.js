import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import MainLayer from '../components/MainLayer';
import TimeNow from './../components/TimeNow';
import '../App.css'
import EueSuggest from '../components/EueSuggest';
import ChartLine from '../components/ChartLine';
import ChartDoughnut from '../components/ChartDoughnut';
import Donation from '../components/Donation';
import axios from 'axios';


function Home() {
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

    async function test() {
        const res = await axios.get("/api/user-info", { withCredentials: true })
        console.log("@@@@", res)
    }
    test()

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
                        {/* <TimeNow /> */}
                        <EueSuggest />
                        <ChartLine />
                        <ChartDoughnut />
                        <Donation />
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}

export default Home;