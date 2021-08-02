import React from "react";
import { Row, Col } from "react-bootstrap";
import Clock from "react-live-clock";
import "../App.css";

function TimeNow() {
  const cardstyled = {
    margin: "auto",
    padding: "0.5em",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    border: 'none',
    flexDirection: 'column',
    color: "rgb(70, 70, 70) ",
    fontWeight: '300'
  };

  return (
    <Row className="text-center w-100" style={cardstyled}>
      <Col className='d-flex justify-content-center'>
        <Clock format={"Y년 M월 D일"} />
      </Col>
      <Col className='d-flex justify-content-center'>
        <Clock
          format={"HH : mm : ss"}
          ticking={true}
          timezone={"Asia/Seoul"}
        />
      </Col>
    </Row>
  );
}

export default TimeNow;
