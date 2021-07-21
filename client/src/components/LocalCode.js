import React, { useState } from 'react'
import { Row, Card, Button, Col, Modal } from 'react-bootstrap';
// import db from "../db/index"
import '../App.css'
import { Link } from 'react-router-dom';


function LocalCode() {

    const logined = localStorage.getItem('nickname')

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
    const nickname = localStorage.getItem('nickname')
    return (
        <>
            <Col className='text-center pt-3 pb-2 px-0'>
                <Card style={cardstyled} id='localName'>
                    <Card.Title>
                        {logined ?
                            `${nickname}`
                            :
                            <>
                                GUEST
                            </>
                        }, 환영합니다.
                    </Card.Title>
                    <Row style={{ alignItems: 'center', margin: 'auto', whiteSpace: 'nowrap' }}>
                        <Card.Subtitle>
                            지역코드
                        </Card.Subtitle>
                        {logined &&
                            <Button variant='light' className='ml-1' style={btnstyled2}>
                                <Link to='/local_code' style={{ textDecoration: 'none', color: 'rgb(110, 189, 142)' }}>
                                    변경
                                </Link>
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