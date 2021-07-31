import React from "react";
import { Row, Card } from "react-bootstrap";
import Clock from "react-live-clock";
import "../App.css";

function TimeNow() {
  const cardstyled = {
    margin: "auto",
    padding: "1em",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    borderWidth: "3px",
    borderRadius: "20px",
    borderColor: "rgb(110, 189, 142)",
    color: "#04AB70",
  };
  return (
    <Row className="text-center w-100 my-2">
      <Card style={cardstyled}>
        <Card.Title>
          <p>현재시각</p>
        </Card.Title>
        <Card.Text>
          <Clock format={"Y년 M월 D일"} />
          <br />
          <Clock
            format={"HH : mm : ss"}
            ticking={true}
            timezone={"Asia/Seoul"}
          />
        </Card.Text>
      </Card>
    </Row>
  );
}

export default TimeNow;
