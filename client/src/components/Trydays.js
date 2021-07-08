import React from 'react'
import { Container, Row, Card, Table, Button } from 'react-bootstrap';
import '../App.css'


function Trydays() {
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
    const btnstyled = {
        background: 'rgb(110, 189, 142)',
        margin: '1px',
        maxWidth: '100%',
        borderWidth: '2px',
        fontSize: '10px',
        borderColor: 'rgba(195, 195, 195, 0.712)',
        borderRadius: '20px',
        color: 'white'
    }

    return (
            <Row className='text-center w-100 my-2'>
                <Card style={cardstyled}>
                    <Card.Title>
                        유저아이디
                    </Card.Title>
                    <Card.Subtitle>
                        지역
                        울릉면
                        지역코드
                        <Button variant='light' style={btnstyled}>
                            변경
                        </Button>

                    </Card.Subtitle>
                    
                    <Card.Text>
                        환경을 향한 노력 ㅁㅁㅁ일 째 입니다.
                    </Card.Text>
                </Card>
            </Row>
    )
}

export default Trydays;