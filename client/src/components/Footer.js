import React from 'react'
import '../App.css'
import { Container, Row, Col } from 'react-bootstrap';


function Footer() {

    return (
        <Container className='m-auto d-flex justify-content-center' id='footer'>
            <Row className='m-auto d-flex justify-content-center text-center w-100'
                style={{ fontSize: '0.8em' }}>
                <hr />
                <Col style={{ display: 'flex', color: 'gray', fontWeight: '300', alignItems: 'center', justifyContent: 'center' }}>
                    © 2021 TEAM EUE. All rights reserved <br />
                    문의 : dev0gomgom@gmail.com
                </Col>
                <Col>
                    <a href='https://www.notion.so/EUE-047f1812c6c24096a528dfd3330c227d'
                        style={{ color: '#04AB70', textDecoration: 'none', fontWeight: '300' }}>

                        <strong>
                            TEAM EUE
                        </strong>
                    </a>
                    <br />
                    안강민, 박상호, 박예은
                </Col>
            </Row>
        </Container >
    )
}

export default Footer;