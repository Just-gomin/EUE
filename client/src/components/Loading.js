import React from 'react'
import { Spinner, Row, Button } from 'react-bootstrap';

function Loading() {
    return (
            <Button id='formbtn' className='d-flex justify-content-center align-items-center m-auto' style={{ width: '200px', height: '200px', flexDirection: 'column' }} disabled>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <br />
                Loading...
            </Button>
    )
}

export default Loading;