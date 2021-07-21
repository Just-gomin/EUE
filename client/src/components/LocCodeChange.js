import React, { useEffect, useState } from 'react'
import '../App.css'
import { Form, Button, Row, Col, Card, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

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

    const [does, setDoes] = useState([])
    const [sggs, setSggs] = useState([])
    // const [emds, setEmds] = useState([])

    const does_array = []
    const sggs_array = []
    // const emds_array = []
    does.map((doesObj) => does_array.push(doesObj['name_doe']))
    sggs.map((sggsObj) => console.log(sggsObj['sgg']))
    console.log('does :: ', does)
    console.log('does_array:::', does_array)

    async function getLocCode() {
        const res = await axios.get("http://localhost:4500/api/data/loccode")
        const local_codes = res.data.locCodes
        console.log('local_codes::: ', local_codes)
        setDoes(local_codes.DOE)
        setSggs(local_codes.SGG)
    }

    useEffect(() => {
        getLocCode()
    }, [])

    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title id='impactTitle'>
                    Local Code
                </Card.Title>
                <Card.Subtitle style={{ fontWeight: 'lighter' }}>
                    Please select a your region
                </Card.Subtitle>
                <hr />
                <Card.Text>

                    <Form style={inboxstyled}>
                        <Row className='m-auto w-100 d-flex justify-content-center'>
                            <Col md={12} xs={12} style={{ padding: '0', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <Form.Group style={btnstyled2}>
                                    <Form.Control as='select' aria-label="Floating label select example">
                                        <option>도</option>
                                        {does.map((doe) => (
                                            <option value={`${doe["code_doe"]}`}>
                                                {`${doe["name_doe"]}`}</option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control as='select' aria-label="Floating label select example">
                                        <option>시군구</option>
                                        {does.map((doe) => (
                                            <option value={`${doe["code_doe"]}`}>
                                                {`${doe["name_doe"]}`}</option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control as='select' aria-label="Floating label select example">
                                        <option>읍면동</option>
                                        {does.map((doe) => (
                                            <option value={`${doe["code_doe"]}`}>
                                                {`${doe["name_doe"]}`}</option>
                                        ))}
                                    </Form.Control>

                                </Form.Group>
                                <Button variant='light' style={btnstyled2} onClick={!locCodeShow && handleClickLoc}>확인</Button>
                            </Col>
                            <Col md={6} xs={4} id='loc-code' style={{
                                margin: '5px',
                                border: 'solid',
                                borderColor: 'rgb(110, 189, 142)',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '2px',
                                // visibility: 'hidden',
                                transition: 'all 2s'
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