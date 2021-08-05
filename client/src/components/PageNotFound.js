import React, { useEffect } from 'react'
import { Row, Container } from 'react-bootstrap';
import Loading from './Loading';

function PageNotFound() {

    useEffect(() => {
        setTimeout(function () {
            window.location.replace('/')
        }, 3000);
    }, [])

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ flexDirection: 'column', height: '70vh' }} >
            <Row>
                <Loading />
            </Row>
            <Row className='m-5'>
                <h1 className='d-flex justify-content-center'>
                    PAGE NOT FOUND
                </h1>
                <br />
                <h3 className='d-flex justify-content-center' style={{ fontWeight: '300' }}>
                    잘못된 접근 입니다.
                </h3>
            </Row>

        </Container>
    )
}

export default PageNotFound;