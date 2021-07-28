import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLogined } from './Auth';

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
