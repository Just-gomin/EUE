import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { callUserInfo } from "../utils/CheckDB";
import { isLogined } from "./../utils/Auth";
import { routesClient } from './../routesClient';

function UsingAircon() {
  const [airUsing, setAirUsing] = useState('');

  console.log("change airUsing", airUsing);

  async function airChange() {
    setAirUsing(!airUsing);
    await axios.get(routesClient.usingAircon, { using_aircon: !airUsing })
  }

  useEffect(() => {
    callUserInfo().then((res) => {
      if (isLogined()) {
        setAirUsing(res[0]['using_aircon'])
      }
    })
  }, [])


  return (
    <>
      {isLogined() && (
        <Form
          key="checkbox"
          className="d-flex justify-content-center w-100"
          style={{ flexDirection: "row-reverse" }}
        >
          <Form.Check
            type="switch"
            id="airconditioner"
            label="에어컨 사용중"
            onChange={airChange}
            checked={airUsing}
          />
        </Form>
      )}
    </>
  );
}

export default UsingAircon;
