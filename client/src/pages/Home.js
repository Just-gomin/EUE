import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import MainLayer from '../components/MainLayer';
import TimeNow from './../components/TimeNow';
import '../App.css'
import EueSuggest from '../components/EueSuggest';
import ChartLine from '../components/ChartLine';
import ChartDoughnut from '../components/ChartDoughnut';
import Footer from './../components/Footer';
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

    axios({
        method: 'get',
        url: 'localhost:4500/loccode/doe'
    }).then((res) => {
        console.log(res)
    })




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

                        {/* <TimeNow /> */}
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