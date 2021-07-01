import React from 'react'
import { Container, Row, Card, Table, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'

function Footer2() {
    const fontstyl = {
        fontSize: '0.5em',
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '2px',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        color: 'rgb(110, 189, 142)'
    }
    const btnstyled = {
        background: 'rgb(110, 189, 142)',
        margin: '1px',
        maxWidth: '100%',
        borderWidth: '2px',
        fontSize: '10px',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
    }


    return (

        <>
            <Row className='text-center w-100 my-2'>
                <Card style={fontstyl}>

                </Card>
            </Row>
        </>
    )
}

export default Footer2;