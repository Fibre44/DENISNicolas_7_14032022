import React, { useEffect } from 'react';
import { userGet } from '../api/api';

export function Site({ credentials }) {
    console.log(credentials.token)

    useEffect(async function () {
        const response = await userGet('/users/' + credentials.userId + '/data', credentials.token)
        console.log(response)

    }, [])
    return <h1>Le user id : {JSON.stringify(credentials.userId)}</h1>
}