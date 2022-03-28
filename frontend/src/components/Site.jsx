import React, { Children, useEffect, useState } from 'react';
import { getData } from '../api/api';
import './../style/nav.sass';
import { Profil } from './users/Profil';

export function Site({ credentials, onDisconnect }) {

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)


    useEffect(async function () {
        const response = await getData('/users/' + credentials.userId + '/identity', credentials.token)
        const userIdentity = await response
        setFirstName(userIdentity.firstname)
        setLastName(userIdentity.lastname)


    }, [])

    const [page, setPage] = useState('home')

    let content = null

    if (page === 'profil') {
        content = <Profil credentials={credentials} />
    }
    return <>
        <NavBar firstname={firstName} lastname={lastName} onClick={setPage} onDisconnect={onDisconnect} />
        {content}


    </>
}

function NavBar({ firstname, lastname, onClick, onDisconnect }) {
    return <>
        <nav className='nav'>
            <h1 className='nav__titre'>Bonjour {firstname} {lastname}</h1>

            <ul className='nav__items'>
                <li className='nav__item'><a href="#profil" onClick={() => onClick('profil')}>Mon profil</a></li>
                <li className='nav__item'><a href='#login' onClick={() => onDisconnect('null')}>Déconnexion</a></li>

            </ul>
        </nav>
    </>


}