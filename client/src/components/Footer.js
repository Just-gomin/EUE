import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Card, Table, Button, Col, Modal, ModalTitle, Overlay, Tooltip } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../App.css'

function Footer() {
    const cardstyled = {
        fontSize: '0.5em',
        margin: 'auto',
        padding: '1em',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderWidth: '1.5px',
        borderRadius: '20px',
        borderColor: '#04AB70',
        color: 'rgb(110, 189, 142)'
    }

    const btnstyled = {
        background: 'white',
        margin: '1px',
        maxWidth: 'fit-content',
        borderWidth: '2px',
        fontSize: '10px',
        color: 'rgb(110, 189, 142)',
        borderColor: 'rgba(195, 195, 195, 0.753)',
        borderRadius: '20px',

    }

    const [donateShow, setDonateShow] = useState(false);


    function clickAndCopy() {
        return new Promise((resolve) => setTimeout(resolve, 2000))
    }

    // function CopyShow() {
    const [isCopyshow, setCopyShow] = useState(false);

    useEffect(() => {
        if (isCopyshow) {
            clickAndCopy().then(() => {
                setCopyShow(false);
            });
        }
    }, [isCopyshow]);

    // }
    const handleClick = () => setCopyShow(true);

    return (
        <Row className='text-center w-100 my-2'>
            <Card style={cardstyled}>
                <Row className='my-1 d-flex justify-content-center' style={{ fontSize: '15px', color: 'rgb(109, 110, 109)' }}>
                    서버비용 후원하기
                </Row>
                <Row className='my-1 d-flex justify-content-center'>
                    이용하시는데 불편함이 없도록 광고 없이 운영하고 있습니다. <br />
                    서버비용 충당 후 후원금이 남을시 UNICEF 에 기부하겠습니다.
                </Row>
                <Row className='my-1 d-flex justify-content-center'>
                    <Button variant='light' style={btnstyled} onClick={() => setDonateShow(true)}>
                        ♥ 후원하기
                    </Button>
                    <Modal
                        size='sm'
                        show={donateShow}
                        onHide={() => setDonateShow(false)}
                        style={{ top: '80px', left: '1vw' }}
                    >
                        <Modal.Header className='d-flex justify-content-center'>
                            <Modal.Title style={{fontSize: '1em'}}>
                                Thank you for your Donation
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col className='d-flex justify-content-center text-center' style={{ flexDirection: 'column' }}>
                                <p style={{ color: 'rgb(109, 110, 109)', margin: '1em', fontSize: '15px' }}>
                                    카카오뱅크
                                </p>
                                <CopyToClipboard text={'박상호 3333-16-7299769'}>
                                    <p className='m-auto' style={btnstyled} >
                                        박상호 3333-16-7299769
                                        <Button variant='light'
                                            disabled={isCopyshow}
                                            onClick={!isCopyshow ? handleClick : null}
                                            style={{
                                                background: 'lightgray',
                                                margin: '5px',
                                                maxWidth: 'fit-content',
                                                borderWidth: '2px',
                                                fontSize: '10px',
                                                color: 'black',
                                                border: 'none',
                                                whiteSpace: 'nowrap'
                                            }}>
                                            {isCopyshow ? '복사 성공!' : '복사'}
                                        </Button>
                                    </p>
                                </CopyToClipboard>
                            </Col>
                        </Modal.Body>

                    </Modal>
                </Row>
                <Row className='my-1 d-flex justify-content-center flex-direction-column' style={{ color: 'rgb(109, 110, 109)', flexDirection: 'column' }}>
                    <Col>
                        <a href='https://www.notion.so/EUE-047f1812c6c24096a528dfd3330c227d' style={{ color: 'rgb(110, 189, 142)' }}>TEAM EUE </a> : 안강민, 박상호, 박예은
                    </Col>
                    <Col>
                        © 2021 TEAM EUE. All rights reserved
                    </Col>
                </Row>

            </Card>
        </Row>
    )
}

export default Footer;