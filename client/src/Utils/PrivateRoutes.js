import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLogined } from '../utils/Auth';

function PrivateRoute({ path, children }) {
    if (isLogined()) {
        return (
            <Route path={path}>
                {children}
            </Route>
        )
    } else {
        alert('권한이 없습니다')
        return (
            <Redirect to='/' />
        )
    }
}
export default PrivateRoute

// Swal.fire({
        //     title: '권한이 없습니다.',
        //     text: ' 로그인을 진행해주세요',
        //     icon: 'warning',
        //     confirmButtonText: '확인',
        // })
        //     .then((res) => {
        //         if (res.isConfirmed) {
        //             window.location.replace('/')
        //         }
        //         else {
        //             window.location.replace('/')
        //         }
        //     })