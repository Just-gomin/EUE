import React, { Component } from 'react';
import { Jumbotron, Container, Row, Card } from 'react-bootstrap';
import Clock from 'react-live-clock'

function TimeNow() {
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
        return (
            <>
                <Row className='text-center w-100 my-2'>
                    <Card style={fontstyl}>
                        <Card.Title>
                            현재시각
                        </Card.Title>
                        <Card.Text>
                            <Clock format={'Y년 M월 D일'} />
                            <br/>
                            <Clock format={'HH : mm : ss'} ticking={true} timezone={"KR"} />
                        </Card.Text>
                    </Card>
                </Row>
            </>
        )
}

export default TimeNow;