import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { callUserInfo } from "../utils/CheckDB";
import { isLogined } from './../utils/Auth';

function UsingAircon() {

    const [airUsing, setAirUsing] = useState(false)

    useEffect(() => {
        callUserInfo().then((res) => {
            if (isLogined()) {
                setAirUsing(res[0].using_aircon)
            }
            else {
                console.log(res)
            }
        })
    }, [])

    async function airChange() {
        setAirUsing(!airUsing)
        await axios.post('/api/edit-profile', { using_aircon: !airUsing })
            .then(
                callUserInfo().then((res) => {
                    if (isLogined()) {
                        console.log('using_aircon :', res[0].using_aircon)
                    }
                    else {
                        console.log(res)
                    }
                })
            )
            .catch(function (error) {
                console.log('err', error);
            });
    }

    return (
        <Form
            key='checkbox' className="d-flex  justify-content-center w-100" style={{ flexDirection: 'row-reverse' }}>
            <Form.Check
                type='switch'
                id='airconditioner'
                label='에어컨 사용중'
                onChange={airChange}
                checked={airUsing}
            />
        </Form>
    )
}

export default UsingAircon;