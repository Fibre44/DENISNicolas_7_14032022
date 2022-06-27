import React, { useEffect, useState } from 'react';
import { getData } from '../api/api';
import './../style/nav.sass';
import { Groups } from './groupes/Groups';
import { Profil } from './users/Profil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPeopleGroup, faUser, faPowerOff, faGhost, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Disconnect } from './Disconnect';
import { Feed } from './Feed';
import { Error } from './ui/Error';
import { Footer } from './footer/Footer';
import { Admin } from './admin/Admin';
import { useMediaQuery } from 'react-responsive'
import { Invitations } from './invite/Invite';
import { Picture } from './users/Picture';

export function Site({ credentials }) {

    const [identity, setIdentity] = useState({})
    const [picture, setPicture] = useState(null)
    const [groups, setGroups] = useState([])
    const [page, setPage] = useState('home')
    const [myGroups, setMyGroups] = useState(null)
    const [invitations, setInvitations] = useState(null)
    const [countInvite, setCountInvite] = useState(null)
    const [refreshInvite, setRefreshInvite] = useState(null)
    const [actifGroup, setActifGroup] = useState({
        uuid: 'Groupomania',
        groupName: 'Groupomania'
    })
    const [refreshMyGroups, setRefreshMyGroups] = useState(null)
    const [refreshPicture, setRefreshPicture] = useState(null)
    const [disconnect, setDisconnect] = useState(false)
    //récupération de l'identité
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/users/identity')
                const userIdentity = await response.json()
                setIdentity(userIdentity.user)

            } catch {
                console.error('Impossible de récupérer l\'identité')
                setPage(() => 'Error')
            }
        }
        fetchData();
    }, []);

    //récupération de la photo de profil
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/users/picture')
                const picture = await response.json()
                setPicture(picture)
            } catch {
                console.error('Impossible de récupérer la photo de profil')
                setPage(() => 'Error')
            }

        }
        fetchData();
    }, [refreshPicture]);

    //récupération de l'ensemble des groupes
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/groups')
                const groups = await response.json()
                setGroups(groups)
            } catch {
                console.error('Impossible de récupérer les groupes')
                setPage(() => 'Error')
            }
        }
        fetchData();
    }, []);

    //récupération des groupes de l'utilisateur

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/groups_users')
                const myGroups = await response.json()
                setMyGroups(myGroups)
            } catch {
                console.error('Impossible de récupérer les groupes')
                setPage(() => 'Error')
            }

        }
        fetchData();
    }, [page, refreshMyGroups]);

    //récupération des invitations

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/invite')
                const myInvitation = await response.json()
                setInvitations(myInvitation)
            } catch {
                console.error('Impossible de récupérer les invitations')
                setPage(() => 'Error')
            }

        }
        fetchData();
    }, [page, refreshInvite]);

    //récupération du nombre d'invitation
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/invite/count')
                const count = await response.json()
                setCountInvite(count)
            } catch {
                console.error('Impossible de récupérer le nombre des invitations')
                setPage(() => 'Error')
            }

            // ...
        }
        fetchData();
    }, [page, refreshInvite]);
    //gestion de la déconnexion
    useEffect(() => {
        async function fetchData() {
            if (disconnect) {
                const response = await getData('/users/logout')
                const responseJson = await response.json()
                credentials(() => false)
            }
        }
        fetchData();
    }, [disconnect]);

    let content = null

    switch (page) {
        case 'profil':
            content = <Profil refreshPicture={setRefreshPicture} />
            break
        case 'groups':
            content = <Groups groups={groups} />
            break
        case 'home':
            content = <Feed actifGroup={actifGroup} identity={identity} myGroups={myGroups} onChange={setActifGroup} refreshMyGroups={setRefreshMyGroups} />
            break
        case 'error':
            content = <Error />
            break
        case 'admin':
            content = <Admin />
            break
        case 'invite':
            content = <Invitations invitations={invitations} refreshInvite={setRefreshInvite} />
            break
        case 'disconnect':
            content = <Disconnect />
            break
        case 'Error':
            content = <Error />
            break
    }

    return <>
        <NavBar identity={identity} onClick={setPage} countInvite={countInvite} picture={picture} onDisconnect={credentials} />
        {content}
        <Footer />
    </>
}

function NavBar({ identity, onClick, countInvite, picture, onDisconnect }) {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    return <>
        <nav className='nav'>

            <div className='nav__user'>
                <h1 className='nav__titre'>Bonjour {identity.firstname} {identity.lastname}</h1>
                <Picture picture={picture} />
            </div>
            {isDesktopOrLaptop &&
                <>
                    <ul className='nav__items'>
                        <li className='nav__item'><a href="#home" onClick={() => onClick('home')}>Accueil</a></li>
                        <li className='nav__item'><a href="#groups" onClick={() => onClick('groups')}>Groupes</a></li>
                        <li className='nav__item'><a href="#invite" onClick={() => onClick('invite')}>Invitations</a></li>
                        <li className='nav__item'><a href="#profil" onClick={() => onClick('profil')}>Profil</a></li>
                        <li className='nav__item'><a href="#admin" onClick={() => onClick('admin')}>Espace admin</a></li>
                        <li className='nav__item'><a href='#logout'>Se déconnecter</a></li>
                    </ul>
                    <span className='nav__item__underline'></span>
                </>
            }
            {isTabletOrMobile &&
                <ul className='nav__items'>
                    <li className='nav__item'><a href="#home" onClick={() => onClick('home')}><FontAwesomeIcon icon={faHouse} /></a></li>
                    <li className='nav__item'><a href="#groups" onClick={() => onClick('groups')}><FontAwesomeIcon icon={faPeopleGroup} /></a></li>
                    <li className='nav__item'><a href="#invite" onClick={() => onClick('invite')}><FontAwesomeIcon icon={faEnvelope} /></a></li>
                    <li className='nav__item'><a href="#profil" onClick={() => onClick('profil')}><FontAwesomeIcon icon={faUser} /></a></li>
                    <li className='nav__item'><a href="#admin" onClick={() => onClick('admin')}><FontAwesomeIcon icon={faGhost} /></a></li>
                    <li className='nav__item'><a href='#logout' onClick={() => onDisconnect(() => '')}><FontAwesomeIcon icon={faPowerOff} /></a></li>
                </ul>
            }
        </nav>
    </>

}




