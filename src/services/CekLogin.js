import React from 'react';
import { Redirect } from 'react-router-dom';

export function CekLogin() {
    if(localStorage.getItem('token')) {
        return <Redirect to={{
            pathname: '/',
            state: {
                notLogin: true
            }
        }}/>
    }
}