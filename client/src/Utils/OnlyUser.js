import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PageNotFound from '../components/PageNotFound';
import { isLogined } from './Auth';

function OnlyUser({ path, children }) {
    if (isLogined()) {
        return (
            <Route path={path}>
                {children}
            </Route>
        )
    } else {
        return (
            <>
                <PageNotFound />
                {/* <Redirect to='/' /> */}
            </>
        )
    }
}
export default OnlyUser
