import React, { useEffect, useState } from 'react';
import { getData } from '../api/api';
import './../style/nav.sass';
import { Groups } from './groupes/groups';
import { Profil } from './users/Profil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPeopleGroup, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Disconnect } from './Disconnect';
import { FormMessage } from './messages/FormMessage';
import { Error } from './ui/Error';

export function Site({ credentials, onDisconnect }) {

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [groups, setGroups] = useState([])
    const [page, setPage] = useState('home')
    const [myGroups, setMyGroups] = useState(null)
    const [actifGroup, setActifGroup] = useState('14840098-7855-4ab9-b256-0d10a2f9e006')
    const [actifGroupName, setActifGroupName] = useState('Groupomania')
    const [messages, setMessages] = useState([])

    useEffect(async function () {
        const response = await getData('/users/identity', credentials.token)
        const userIdentity = await response.json()
        setFirstName(userIdentity.firstname)
        setLastName(userIdentity.lastname)
    }, [page])

    useEffect(async function () {
        const response = await getData('/groups/all', credentials.token)
        const groups = await response.json()
        setGroups(groups)
    }, [page])// si l'élement page change on doit recharger les groupes

    //récupération des groupes de l'utilisateur

    useEffect(async function () {
        const response = await getData('/groups_users/groups', credentials.token)
        const myGroups = await response.json()
        setMyGroups(myGroups)
    }, [page])// si l'élement page change on doit recharger les groupes

    //Récupération des messages

    useEffect(async function () {
        const response = await getData('/groups/' + actifGroup + '/messages', credentials.token)
        const groupMessages = await response.json()
        setMessages(groupMessages)

    }, [actifGroup])


    let content = null

    if (page === 'profil') {
        content = <Profil credentials={credentials} />
    }

    if (page === 'groups') {
        content = <Groups groups={groups} token={credentials.token} />
    }
    if (page === 'home') {
        content = <FormMessage actifGroup={actifGroup} actifGroupName={actifGroupName} token={credentials.token} firstName={firstName} lastName={lastName} />
    }
    if (page === 'error') {
        content = <Error />
    }

    if (credentials.token == null) {
        content = <Disconnect />
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

                <li className='nav__item'><a href="#home" onClick={() => onClick('home')}><FontAwesomeIcon icon={faHouse} /></a></li>
                <li className='nav__item'><a href="#groups" onClick={() => onClick('groups')}><FontAwesomeIcon icon={faPeopleGroup} /></a></li>
                <li className='nav__item'><a href="#profil" onClick={() => onClick('profil')}><FontAwesomeIcon icon={faUser} /></a></li>
                <li className='nav__item'><a href='#login' onClick={() => onDisconnect('null')}><FontAwesomeIcon icon={faPowerOff} /></a></li>

            </ul>
        </nav>
    </>


}


