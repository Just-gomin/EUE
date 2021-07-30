import React, { useEffect, useState } from 'react'
import '../App.css'
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { callUserInfo } from '../utils/CheckDB';


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
        maxWidth: '90%',
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

    const [does, setDoes] = useState([]) // DOE
    const [sggs, setSggs] = useState([]) // SGG
    const [emds, setEmds] = useState([]) // EMD
    const [sggsArray, setSggsArray] = useState([]) // DOE 와 SGG 내의 code_doe 같을 때 => sgg 값
    const [emdsArray, setEmdsArray] = useState([]) // SGG 과 EMD 내의 code_sgg && DOE 와 EMD 내의 code_doe => emd 값

    const doeSelect = document.getElementById('select-doe')
    const sggSelect = document.getElementById('select-sgg')
    const emdSelect = document.getElementById('select-emd')

    // Local code 받아오기
    useEffect(() => {
        async function getLocCode() {
            const res = await axios.get("/api/data/loccode")
            const local_codes = res.data.contents.loc_code

            setDoes(local_codes.DOE)
            setSggs(local_codes.SGG)
            setEmds(local_codes.EMD)
        }

        getLocCode()
    }, [])

    function selectLocal() {
        sggs.map(function (sggvalue) {
            if (Number(doeSelect.value) === sggvalue['code_doe']) {
                setSggsArray(sggvalue['sgg'])
            }
        })
        emds.map(function (emdvalue) {
            if ((Number(sggSelect.value) === emdvalue['code_sgg'])
                && (Number(doeSelect.value) === emdvalue['code_doe'])) {
                setEmdsArray(emdvalue['emd'])
            }
        })
    }


    async function handleSubmit(event) {
        event.preventDefault()
        if (doeSelect.options[doeSelect.selectedIndex].text !== '도'
            && sggSelect.options[sggSelect.selectedIndex].text !== '시군구'
            && emdSelect.options[emdSelect.selectedIndex].text !== '읍면동') {

            const saveCodeEmd = emdSelect.value

            await axios.post('/api/edit-profile', { loc_code: saveCodeEmd }) // loccal code 수정

            callUserInfo().then((res) => {
                console.log('loc_code', res[0].loc_code)
                if (res[0].loc_code) {
                    Swal.fire({
                        title: '변경되었습니다.',
                        text: '축하드립니다!👏',
                        icon: 'success',
                        customClass: 'swal-wide',
                        confirmButtonText: '확인',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.location.replace('/')
                        }
                        else {
                            window.location.replace('/')
                        }
                    })
                }
            })


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
                    <Form style={inboxstyled} onSubmit={handleSubmit}>
                        <Row md={12} xs={12} className='m-auto w-100 d-flex justify-content-center' style={{ padding: '0', display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Form.Group className='m-auto w-100' style={btnstyled2} onChange={selectLocal}>
                                <Row className='m-auto pb-3'>
                                    <Col md={4} xs={4} style={{ padding: '2px' }}>

                                        <Form.Control as='select' size="sm" id='select-doe' required>
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
                                        <Form.Control as='select' size="sm" id='select-sgg' required>
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
                                        <Form.Control as='select' size="sm" id='select-emd' required>
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
                            <Button
                                variant='light' style={btnstyled2} type='submit'>
                                확인
                            </Button>
                        </Row>
                    </Form>
                </Card.Text>
            </Card>
        </Row>
    )
}

export default LocCodeChange;