import React, { Component } from 'react';
import { Jumbotron, Container, Row, Card } from 'react-bootstrap';
import Clock from 'react-live-clock'
import '../App.css'


function TimeNow() {
    const cardstyled = {
        fontSize: '0.5em',
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '1.5px',
        borderRadius: '20px',
        borderColor: '#04AB70',
        color: 'rgb(110, 189, 142)'
    }
        return (
                <Row className='text-center w-100 my-2'>
                    <Card style={cardstyled}>
                        <Card.Title style={{color:'black'}}>
                            현재시각
                        </Card.Title>
                        <Card.Text>
                            <Clock format={'Y년 M월 D일'} />
                            <br/>
                            <Clock format={'HH : mm : ss'} ticking={true} timezone={"KR"} />
                        </Card.Text>
                    </Card>
                </Row>
        )
}

export default TimeNow;