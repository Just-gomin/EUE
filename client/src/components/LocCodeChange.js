import React from 'react'
import '../App.css'
import { Form, Button, Row, Col, Card, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';

function LocCodeChange() {

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
        padding: '10px'
    }


    const btnstyled2 = {
        background: 'white',
        margin: '1px',
        maxWidth: 'fit-content',
        borderWidth: '2px',
        color: 'rgb(110, 189, 142)',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px'
    }

    const [locCodeShow, setLocCodeShow] = useState(false)

    function handleClickLoc() {
        setLocCodeShow(true);
        const auth = document.getElementById('loc-code')
        auth.style.visibility = 'visible'
    }

    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title id='impactTitle'>
                    Local Code
                </Card.Title>
                <Card.Subtitle style={{ fontWeight: 'lighter' }}>
                    Please select a region name
                </Card.Subtitle>
                <hr />
                <Card.Text>
                    <Form style={inboxstyled}>
                        <Row className='m-auto w-100 d-flex justify-content-center'>
                            <Col md={12} xs={12} style={{ padding: '0', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                {['도', '시군구', '읍면동'].map((localname) => (
                                    <DropdownButton
                                        variant='light'
                                        style={btnstyled2}
                                        title='지역코드'
                                        as={ButtonGroup}
                                        title={` ${localname} `}>
                                        <Dropdown.Item>Action</Dropdown.Item>
                                        <Dropdown.Item>Another action</Dropdown.Item>
                                        <Dropdown.Item>Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>Separated link</Dropdown.Item>
                                    </DropdownButton>
                                ))}
                                <Button variant='light' style={btnstyled2} onClick={!locCodeShow && handleClickLoc}>확인</Button>
                            </Col>
                            <Col md={6} xs={4} id='loc-code' style={{
                                margin: '5px',
                                border: 'solid',
                                borderColor: 'rgb(110, 189, 142)',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '2px',
                                visibility: 'hidden',
                                transition: 'all 4s'
                            }}>
                                지역코드
                            </Col>
                        </Row>

                    </Form>

                </Card.Text>
            </Card>

        </Row>
    )
}

export default LocCodeChange;