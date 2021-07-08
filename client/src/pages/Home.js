import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import MainLayer from '../components/MainLayer';
import TimeNow from './../components/TimeNow';
import '../App.css'
import Trydays from './../components/Trydays';
import EueSuggest from '../components/EueSuggest';
import ChartLine from '../components/ChartLine';
import ChartDoughnut from '../components/ChartDoughnut';
import Footer from './../components/Footer';
import { useEffect } from 'react';


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
    useEffect(() => {
        console.log('마운트 될때마다 실행');
    }, []);

    return (
        <Container fluid className='d-flex justify-content-center position-relative'>
            <Row style={constyled}>
                <Col xs={12} md={4} className='d-flex justify-content-center' id='stickyy'>
                    <Row style={col1sty} className='m-auto'>
                        <MainLayer />
                    </Row>

                </Col>
                <Col md={6} style={col2sty}>
                    <Row style={constyled} className='d-flex mb-2 w-100'>
                        {/* <KakaoLogin/> */}
                        {/* <TimeNow /> */}
                        <Trydays />
                        <EueSuggest />
                        <ChartLine />
                        <ChartDoughnut />
                        <Footer />
                    </Row>
                </Col>
            </Row>
        </Container>

    );
}

export default Home;