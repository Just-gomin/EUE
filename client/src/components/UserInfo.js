import React, { useState } from 'react'
import { Row, Card, Button, Col, Modal } from 'react-bootstrap';
import '../App.css'
import { Link } from 'react-router-dom';
import { checkCookies } from './../utils/Cookies';


function UserInfo() {

    const nickname = localStorage.getItem('nickname')
    const localname_doe = localStorage.getItem('name_doe')
    const localname_sgg = localStorage.getItem('name_sgg')
    const localname_emd = localStorage.getItem('name_emd')

    const cardstyled = {
        margin: 'auto',
        padding: '1em 0.5em 1em 0.5em',
        // paddingTop: '1em',
        // paddingBottom: '1em',
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
            <Col className='text-center pt-3 pb-2 px-0'>
                <Card style={cardstyled} id='localName'>
                    <Card.Title>
                        <strong>
                            {checkCookies() ?
                                <h2>
                                    {`${nickname}`}
                                </h2>
                                :
                                <h2>
                                    GUEST
                                </h2>
                            }
                        </strong>
                        <p style={{ fontWeight: '300', margin: '0' }}>
                            환영합니다
                        </p>
                    </Card.Title>
                    <hr />
                    <Row style={{ alignItems: 'center', margin: 'auto', justifyContent: 'center' }}>
                        <Card.Subtitle>
                            {localname_emd ?
                                <p className='mb-2'>

                                    {`${localname_doe}`}
                                    <br />
                                    {`${localname_sgg}`}
                                    <br />
                                    {`${localname_emd}`}
                                </p>
                                :
                                <p className='mb-2'>
                                    로그인 후 이용 가능합니다
                                </p>
                            }
                        </Card.Subtitle>
                        {checkCookies() &&
                            <Button variant='light' className='m-auto d-flex' style={btnstyled2}>
                                <Link to='/edit' className='w-100' style={{ textDecoration: 'none', color: 'rgb(110, 189, 142)' }}>
                                    변경
                                </Link>
                            </Button>
                        }
                    </Row>
                    {checkCookies() &&
                        <p className='w-100 justify-content-center m-auto'>
                            <hr />

                            환경을 향한 노력 <br />
                            <strong>OOO 일 째</strong>
                        </p>
                    }
                </Card>
            </Col>
    )
}
export default UserInfo;