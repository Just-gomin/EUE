import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { callUserInfo, checkCookies } from "../utils/CheckDB";
import { isLogined } from './../utils/Auth';

function UsingAircon() {

    const [airUsing, setAirUsing] = useState(false)

    // useEffect(() => {
    //     callUserInfo().then((res) => {
    //         if (isLogined()) {
    //             setAirUsing(res.using_aircon)
    //         }
    //         else {
    //             console.log(res)
    //         }
    //     })
    // }, [checkCookies()])

    function airChange() {
        setAirUsing(!airUsing)
        async function Useair() {
            const res = await axios.post('/api/edit-profile', { using_aircon: !airUsing })
            console.log(res)
        }
        
        Useair()
    }


    console.log('airUsing', airUsing)

    return (
        <>
            {isLogined() &&
                <Form
                    key='checkbox' className="d-flex justify-content-center w-100" style={{ flexDirection: 'row-reverse' }}>
                    <Form.Check
                        type='switch'
                        id='airconditioner'
                        label='에어컨 사용중'
                        onChange={airChange}
                        checked={airUsing}
                    />
                </Form>
            }
        </>
    )
}

export default UsingAircon;