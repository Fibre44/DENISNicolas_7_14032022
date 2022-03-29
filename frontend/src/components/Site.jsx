import React, { Children, useEffect, useState } from 'react';
import { getData } from '../api/api';
import './../style/nav.sass';
import { Groups } from './groupes/groups';
import { Profil } from './users/Profil';

export function Site({ credentials, onDisconnect }) {

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [groups, setGroups] = useState([])
    const [page, setPage] = useState('profil')

    useEffect(async function () {
        const response = await getData('/users/identity', credentials.token)
        const userIdentity = await response
        setFirstName(userIdentity.firstname)
        setLastName(userIdentity.lastname)
    }, [])


    useEffect(async function () {
        const response = await getData('/groups/all', credentials.token)
        const groups = await response
        setGroups(groups)
    }, [page])// si l'élement page change on doit recharger les groupes

    let content = null

    if (page === 'profil') {
        content = <Profil credentials={credentials} />
    }

    if (page === 'groups') {
        content = <Groups groups={groups} />
    }
    if (page === 'home') {
        content = <h1>Fil d'actualité</h1>
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
                <li className='nav__item'><a href="#groups" onClick={() => onClick('home')}>Accueil</a></li>
                <li className='nav__item'><a href="#groups" onClick={() => onClick('groups')}>Groupes</a></li>
                <li className='nav__item'><a href="#profil" onClick={() => onClick('profil')}>Mon profil</a></li>
                <li className='nav__item'><a href='#login' onClick={() => onDisconnect('null')}>Déconnexion</a></li>

            </ul>
        </nav>
    </>


}