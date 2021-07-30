import React, { useState, useEffect } from 'react'
import { Row, Card, Button, Col } from 'react-bootstrap';
import '../App.css'
import { Link } from 'react-router-dom';
import { callUserInfo, checkCookies } from '../utils/CheckDB';
import axios from 'axios';


function UserInfo() {

    const cardstyled = {
        margin: 'auto',
        padding: '1em 0.5em 1em 0.5em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '3px',
        borderRadius: '20px',
        borderColor: 'rgba(195, 195, 195, 0.753)',

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

    const localname_doe = localStorage.getItem('name_doe')
    const localname_sgg = localStorage.getItem('name_sgg')
    const localname_emd = localStorage.getItem('name_emd')
    const localcode_emd = localStorage.getItem('code_emd')

    const [userNick, setUserNick] = useState('')
    const [createdTime, setCreatedTime] = useState('')



    useEffect(() => {
        callUserInfo().then((res) => {
            if (res !== []) {
                setUserNick(res[0]['nick_name'])
                const dateStr = res[0]['created_at'].split('T')[0].split('-')
                console.log(dateStr)
                const now = new Date();

                const year = now.getFullYear(); // 년
                const month = now.getMonth() + 1; // 월 0부터 시작
                const day = now.getDate(); // 일

                const stDate = new Date(dateStr[0], dateStr[1], dateStr[2])
                console.log(stDate)

                const endDate = new Date(year, month, day)
                console.log(endDate)

                const btMs = endDate.getTime() - stDate.getTime() // 주어진 날짜 사이의 경과 시간 (밀리 초)
                console.log(btMs / 1000)

                const btDay = btMs / (1000 * 60 * 60 * 24)
                console.log(btDay)

                setCreatedTime(btDay)
            }
            else {
                console.log('Not Logined')
            }
        })
    }, [])

    return (
        <Col className='text-center pt-3 pb-2 px-0'>
            <Card style={cardstyled} id='localName'>
                <Card.Title>
                    <strong>
                        {checkCookies() ?
                            <h3>
                                {`${userNick}`}
                            </h3>
                            :
                            <h3>
                                GUEST
                            </h3>
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

                    <Card.Text>
                        <hr />
                        <Row style={{ color: 'black' }}>
                            <p style={{ fontWeight: '300', margin: '0' }}>
                                환경을 향한 노력
                            </p>
                            <h3 style={{ fontWeight: '300', color: '#2b90d9',  margin: '0' }}>
                                {createdTime}일차
                            </h3>

                        </Row>

                    </Card.Text>
                }
            </Card>
        </Col>
    )
}
export default UserInfo;