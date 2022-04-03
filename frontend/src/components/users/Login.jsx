import React, { useState } from 'react';
import './../../style/form.sass'
import './../../style/alert.sass'
import { Register } from './Register.jsx';
import { LoginForm } from './LoginForm';


export function Login({ onConnect }) {

    const [page, setPage] = useState('login')

    let content = null

    if (page === 'login') {
        content = <LoginForm onConnect={onConnect} onClick={setPage} />

    } else {

        content = <Register onClick={setPage} />
    }

    return <>
        {content}
    </>

}





