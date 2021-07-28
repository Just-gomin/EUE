import React, { useEffect, useState } from 'react'
import { Row, Card, Button, Col, Modal, } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../App.css'

function Donation() {
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

    const btnstyled2 = {
        background: 'white',
        margin: '1px',
        maxWidth: 'fit-content',
        borderWidth: '2px',
        color: 'rgb(110, 189, 142)',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',
    }

    const [donateShow, setDonateShow] = useState(false);
    const [isCopyshow, setCopyShow] = useState(false);

    const HandleClose = () => setDonateShow(false);

    function clickAndTwoSec() {
        return new Promise((resolve) => setTimeout(resolve, 2000))
    }

    useEffect(() => {
        if (isCopyshow) {
            clickAndTwoSec().then(() => {
                setCopyShow(false);
            });
        }
    }, [isCopyshow]);
    // isCopyshow 가 바뀔 때만 effect를 재실행한다.

    const handleClick = () => setCopyShow(true);

    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Card.Title>
                    <p>
                        서버비용 후원하기
                    </p>
                </Card.Title>
                <Card.Subtitle>
                    이용하시는데 불편함이 없도록 광고 없이 운영하고 있습니다. <br />
                    서버비용 충당 후 후원금이 남을시 UNICEF 에 기부하겠습니다.
                </Card.Subtitle>
                <Row className='my-2 d-flex justify-content-center'>
                    <Button variant='light' style={btnstyled2} onClick={() => setDonateShow(true)}>
                        ♥ 후원하기
                    </Button>
                    <Modal
                        size='md'
                        show={donateShow}
                        onHide={HandleClose}
                        style={{ top: '80px', left: '1vw' }}
                    >
                        <Modal.Header className='d-flex justify-content-center'>
                            <Modal.Title>
                                ♥ Thank you for Donation ♥
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col className='d-flex justify-content-center text-center' style={{ flexDirection: 'column' }}>
                                <Card style={{ color: 'rgb(109, 110, 109)', paddingTop: '10px' }}>
                                    카카오뱅크
                                    <CopyToClipboard text={'박상호 3333-16-7299769'}>
                                        <p className='m-auto' style={btnstyled2} >
                                            박상호 3333-16-7299769
                                            <Button variant='light'
                                                disabled={isCopyshow}
                                                onClick={!isCopyshow ? handleClick : null}
                                                style={{
                                                    background: 'lightgray',
                                                    margin: '5px',
                                                    maxWidth: 'fit-content',
                                                    borderWidth: '2px',
                                                    fontSize: '14px',
                                                    color: 'black',
                                                    border: 'none',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                {isCopyshow ? '복사 성공!' : '복사'}

                                            </Button>
                                        </p>
                                    </CopyToClipboard>
                                </Card>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='light' style={btnstyled2} onClick={HandleClose}>
                                닫기
                            </Button>
                        </Modal.Footer>

                    </Modal>
                </Row>
                <Row className='d-flex justify-content-center flex-direction-column' style={{ color: 'rgb(109, 110, 109)', flexDirection: 'column', fontSize: '0.8em' }}>
                    
                </Row>

            </Card>
        </Row>
    )
}

export default Donation;