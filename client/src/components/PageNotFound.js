import React, { useEffect } from 'react'
import { Row, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

// const goHome = setTimeout(window.location.replace('/'), 3000);


function PageNotFound() {
    useEffect(() => {
        setTimeout(window.location.replace('/'), 5000);
    }, [])

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ flexDirection: 'column', height: '70vh' }} >
            <Row style={{marginBottom: '1em', fontSize: '2rem', fontWeight: 'bold' }}>
                잘못된 접근 입니다. <br />PAGE NOT FOUND
            </Row>
            <Row>
                <Loading />
            </Row>
        </Container>
    )
}

export default PageNotFound;