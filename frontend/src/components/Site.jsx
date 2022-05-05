import React, { useEffect, useState } from 'react';
import { getData } from '../api/api';
import './../style/nav.sass';
import { Groups } from './groupes/Groups';
import { Profil } from './users/Profil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPeopleGroup, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Disconnect } from './Disconnect';
import { Feed } from './Feed';
import { Error } from './ui/Error';
import { Footer } from './footer/Footer';

export function Site({ credentials, onDisconnect }) {

    const [identity, setIdentity] = useState({})
    const [groups, setGroups] = useState([])
    const [page, setPage] = useState('home')
    const [myGroups, setMyGroups] = useState(null)
    const [actifGroup, setActifGroup] = useState({
        uuid: 'Goupomania',
        groupName: 'Goupomania'
    })
    const [refreshMyGroups, setRefreshMyGroups] = useState(null)
    //récupération de l'identité

    useEffect(async function () {
        const response = await getData('/users/identity', credentials.token)
        const userIdentity = await response.json()
        setIdentity(userIdentity.user)
    }, [])

    //récupération de l'ensemble des groupes
    useEffect(async function () {
        const response = await getData('/groups', credentials.token)
        const groups = await response.json()
        setGroups(groups)
    }, [])// si l'élement page change on doit recharger les groupes

    //récupération des groupes de l'utilisateur

    useEffect(async function () {
        const response = await getData('/groups_users', credentials.token)
        const myGroups = await response.json()
        setMyGroups(myGroups)
    }, [page, refreshMyGroups])// si l'élement page change on doit recharger les groupes

    let content = null

    if (page === 'profil') {
        content = <Profil credentials={credentials} />
    }

    if (page === 'groups') {
        content = <Groups groups={groups} token={credentials.token} />
    }
    if (page === 'home') {
        content = <Feed actifGroup={actifGroup} token={credentials.token} identity={identity} myGroups={myGroups} onChange={setActifGroup} refreshMyGroups={setRefreshMyGroups} />
    }
    if (page === 'error') {
        content = <Error />
    }

    if (credentials.token == null) {
        content = <Disconnect />
    }
    return <>
        <NavBar identity={identity} onClick={setPage} onDisconnect={onDisconnect} />
        {content}
        <Footer />
    </>
}

function NavBar({ identity, onClick, onDisconnect }) {

    return <>
        <nav className='nav'>
            <h1 className='nav__titre'>Bonjour {identity.firstname} {identity.lastname}</h1>

            <ul className='nav__items'>
                <li className='nav__item'><a href="#home" onClick={() => onClick('home')}><FontAwesomeIcon icon={faHouse} /></a></li>
                <li className='nav__item'><a href="#groups" onClick={() => onClick('groups')}><FontAwesomeIcon icon={faPeopleGroup} /></a></li>
                <li className='nav__item'><a href="#profil" onClick={() => onClick('profil')}><FontAwesomeIcon icon={faUser} /></a></li>
                <li className='nav__item'><a href='#login' onClick={() => onDisconnect('null')}><FontAwesomeIcon icon={faPowerOff} /></a></li>
            </ul>
        </nav>
    </>

}


