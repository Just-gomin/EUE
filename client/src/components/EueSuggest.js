import React, { useEffect } from 'react'
import { Row, Card, Col } from 'react-bootstrap';
import { isLogined } from '../utils/Auth';

function EueSuggest() {

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

    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>

                <Card.Title>
                    <p>
                        EUE 제안
                    </p>
                </Card.Title>
                <Card.Text>
                    {isLogined() ?
                        <>
                            에어컨을 줄이시면 더 효율적입니다.
                        </>
                        :
                        <>
                            로그인 후 사용가능합니다.
                        </>
                    }
                </Card.Text>

            </Card>
        </Row>
    )
}

export default EueSuggest;