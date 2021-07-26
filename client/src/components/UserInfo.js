import React, { useState } from 'react'
import { Row, Card, Button, Col, Modal } from 'react-bootstrap';
import '../App.css'
import { Link } from 'react-router-dom';


function UserInfo() {

    const nickname = localStorage.getItem('nickname')
    const localname_doe = localStorage.getItem('name_doe')
    const localname_sgg = localStorage.getItem('name_sgg')
    const localname_emd = localStorage.getItem('name_emd')

    const cardstyled = {
        margin: 'auto',
        paddingTop: '1em',
        paddingBottom: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '3px',
        borderRadius: '20px',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        // color: '#04AB70'
        color: 'rgb(110, 189, 142)',


    }
    const btnstyled2 = {
        background: 'white',
        margin: 'auto',
        borderWidth: '2px',
        // padding: '0',
        fontSize: '0.7em',
        color: 'rgb(110, 189, 142)',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        // borderRadius: '20px',
        width: '50%'
    }

    return (
        <Row>
            <Col className='text-center pt-3 pb-2 px-0'>
                <Card style={cardstyled} id='localName'>
                    <Card.Title>
                        {nickname ?
                            `${nickname}`
                            :
                            <>
                                GUEST
                            </>
                        }, 환영합니다.
                    </Card.Title>
                    <Row style={{ alignItems: 'center', margin: 'auto', justifyContent: 'center' }}>
                        <Card.Subtitle className='py-3' style={{fontSize: '0.9em'}}>
                            {localname_emd ?
                                `${localname_doe} ${localname_sgg} ${localname_emd}`
                                :
                                <>
                                    지역을 입력해 주세요
                                </>
                            }
                        </Card.Subtitle>
                        {nickname &&
                            <Button variant='light' className='m-auto d-flex' style={btnstyled2}>
                                <Link to='/local_code' className='w-100' style={{ textDecoration: 'none', color: 'rgb(110, 189, 142)' }}>
                                    변경
                                </Link>
                            </Button>
                        }
                    </Row>
                    <hr />

                    환경을 향한 노력 <br />
                    <strong>OOO 일 째</strong>
                </Card>
            </Col>
        </Row>
    )
}
export default UserInfo;