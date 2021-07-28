import React, { useEffect, useState } from 'react'
import '../App.css'
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'


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
        padding: '0.5em',
        color: 'black'
    }

    const btnstyled2 = {
        background: 'white',
        width: '50%',
        borderWidth: '2px',
        color: 'rgb(110, 189, 142)',
        borderColor: 'rgba(195, 195, 195, 0.753)',
    }

    const [does, setDoes] = useState([])
    const [sggs, setSggs] = useState([])
    const [emds, setEmds] = useState([])
    const [sggsArray, setSggsArray] = useState([])
    const [emdsArray, setEmdsArray] = useState([])

    const doeSelect = document.getElementById('select-doe')
    const sggSelect = document.getElementById('select-sgg')
    const emdSelect = document.getElementById('select-emd')


    function handleClickLoc() {
        if (doeSelect.options[doeSelect.selectedIndex].text !== '도' && sggSelect.options[sggSelect.selectedIndex].text !== '시군구' && emdSelect.options[emdSelect.selectedIndex].text !== '읍면동') {
            localStorage.setItem('code_doe', doeSelect.value)
            localStorage.setItem('name_doe', doeSelect.options[doeSelect.selectedIndex].text)
            localStorage.setItem('code_sgg', sggSelect.value)
            localStorage.setItem('name_sgg', sggSelect.options[sggSelect.selectedIndex].text)
            localStorage.setItem('code_emd', emdSelect.value)
            localStorage.setItem('name_emd', emdSelect.options[emdSelect.selectedIndex].text)

            if (localStorage.getItem('name_emd')) {
                Swal.fire({
                    title: '변경되었습니다.',
                    text: '축하드립니다!👏',
                    icon: 'success',
                    customClass: 'swal-wide',
                    confirmButtonText: '확인',
                }).then((res) => {
                    if (res.isConfirmed) {
                        window.location.reload()
                    }
                    else {
                        window.location.reload()
                    }
                })
            }
        }
        else {
            Swal.fire({
                title: '실패',
                text: '전부 선택해주세요',
                icon: 'error',
                customClass: 'swal-wide',
                confirmButtonText: '확인'
            })
        }

    }

    async function getLocCode() {
        const res = await axios.get("http://localhost:4500/api/data/loccode")
        const local_codes = res.data.locCodes

        setDoes(local_codes.DOE)
        setSggs(local_codes.SGG)
        setEmds(local_codes.EMD)
    }

    useEffect(() => {
        getLocCode()
    }, [])


    function selectLocal() {
        sggs.map(function (sggvalue) {
            if (doeSelect.value == sggvalue['code_doe']) {
                setSggsArray(sggvalue['sgg'])
            }
        })
        emds.map(function (emdvalue) {
            if (sggSelect.value == emdvalue['code_sgg']) {
                setEmdsArray(emdvalue['emd'])
            }
        })
    }



    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title id='impactTitle'>
                    지역 코드
                </Card.Title>
                <Card.Subtitle style={{ fontWeight: 'lighter' }}>
                    본인의 지역을 선택해주세요
                </Card.Subtitle>
                <hr />
                <Card.Text className='m-0'>
                    <Form style={inboxstyled}>
                        <Row md={12} xs={12} className='m-auto w-100 d-flex justify-content-center' style={{ padding: '0', display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Form.Group className='m-auto w-100' style={btnstyled2}>
                                <Row className='m-auto pb-3' onChange={selectLocal}>
                                    <Col md={4} xs={4} style={{ padding: '2px' }}>

                                        <Form.Control as='select' size="sm" id='select-doe'>
                                            <option selected disabled>도</option>
                                            {
                                                does.map((doevalue) => (
                                                    <option value={`${doevalue["code_doe"]}`}>
                                                        {`${doevalue["name_doe"]}`}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>

                                    <Col md={4} xs={4} style={{ padding: '2px' }}>
                                        <Form.Control as='select' size="sm" id='select-sgg'>
                                            <option selected disabled>시군구</option>
                                            {
                                                sggsArray.map((sggvalue) => (
                                                    <option value={`${sggvalue["code_sgg"]}`}>
                                                        {`${sggvalue["name_sgg"]}`}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>

                                    <Col md={4} xs={4} style={{ padding: '2px' }}>
                                        <Form.Control as='select' size="sm" id='select-emd'>
                                            <option selected disabled>읍면동</option>
                                            {
                                                emdsArray.map((emdvalue) => (
                                                    <option value={`${emdvalue["code_emd"]}`}>
                                                        {`${emdvalue["name_emd"]}`}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                    </Form>
                    <Row className='d-flex justify-content-center'>
                        <Button
                            variant='light' style={btnstyled2} onClick={handleClickLoc}>
                            확인
                        </Button>
                    </Row>
                </Card.Text>
            </Card>
        </Row>
    )
}

export default LocCodeChange;