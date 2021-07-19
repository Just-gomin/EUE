import React, { useState } from 'react'
import { Container, Row, Card, Table, Button, Col, Modal } from 'react-bootstrap';
// import db from "../db/index"
import '../App.css'
import { LoginWithKakao } from '../utils/Oauth';


function LocalCode() {

    const kakao_accToken = localStorage.getItem('Kakao_token')

    const cardstyled = {
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '3px',
        borderRadius: '20px',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        color: 'rgb(110, 189, 142)'
    }
    const btnstyled2 = {
        background: 'white',
        margin: 'auto',
        borderWidth: '2px',
        fontSize: '0.5em',
        color: 'rgb(110, 189, 142)',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
    }

    const [localChange, setLocalChange] = useState(false)
    const user_email = localStorage.getItem('user_email')
    return (
        <>
            <Col className='text-center pt-3 pb-2 px-0'>
                <Card style={cardstyled} id='localName'>
                    <Card.Title>
                        {kakao_accToken ?
                            `${user_email}`
                            :
                            <>
                                GUEST
                            </>
                        }
                    </Card.Title>
                    <Row style={{ alignItems: 'center', margin: 'auto', whiteSpace: 'nowrap' }}>
                        <Card.Subtitle>
                            지역코드
                        </Card.Subtitle>
                        {kakao_accToken &&
                            <Button variant='light' className='ml-1' onClick={() => setLocalChange(true)} style={btnstyled2}>
                                변경
                            </Button>
                        }
                    </Row>
                    <Modal
                        show={localChange}
                        onHide={() => setLocalChange(false)}
                    >
                        <Modal.Header className='d-block text-center'>
                            <Modal.Title>
                                마이페이지
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            지역이름 (지역코드)
                        </Modal.Body>
                    </Modal>

                    환경을 향한 노력 <br />
                    <strong>OOO 일 째</strong>
                </Card>
            </Col>
        </>
    )
}
export default LocalCode;