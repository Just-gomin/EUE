import React, { useEffect } from 'react'
import { Row, Card, Col, Form, Button, FloatingLabel } from 'react-bootstrap';

function NicknameChange() {

    const cardstyled = {
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '3px',
        borderRadius: '20px',
        borderColor: 'rgb(110, 189, 142)',
        color: '#04AB70'
    }

    const inboxstyled = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80%',
        justifyContent: 'center',
        margin: 'auto',
        padding: '0.5em',
        color: 'black'
    }

    const exNick = localStorage.getItem('nickname')
    console.log(exNick)

    function handleChange ({ target: { value } }) {
        localStorage.setItem('nickname', value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        window.location.reload();
    };


    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title id='impactTitle'>
                    닉네임 변경
                </Card.Title>
                <Card.Subtitle style={{ fontWeight: 'lighter' }}>
                    새로운 닉네임으로 변경해보세요
                </Card.Subtitle>
                <hr />
                <Card.Text className='m-0'>

                    <Form style={inboxstyled} onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Nickname"
                        >
                            <Form.Control type="text" placeholder="닉네임 변경" id='nickname' onChange={handleChange} />
                        </FloatingLabel>
                        <Button variant='light' className='mt-3' id='formbtn' type='submit'>
                            변 경
                        </Button>
                    </Form>



                </Card.Text>

            </Card>
        </Row>
    )
}

export default NicknameChange;