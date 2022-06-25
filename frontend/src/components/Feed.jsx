import React, { useEffect, useState } from 'react';
import { FormMessage } from "./messages/FormMessage";
import { MyGroups, MyGroupsLaptop } from "./groupes/Groups";
import { Messages } from "./messages/Messages";
import { GroupDescription } from "./groupes/GroupDescription"
import './../style/main.sass'
import { getData } from '../api/api';
import { useMediaQuery } from 'react-responsive'
import { InviteForm } from './invite/InviteForm';
import { Loading } from './ui/Loading'
import { Error } from './ui/Error'

export function Feed({ actifGroup, identity, myGroups, onChange, refreshMyGroups }) {
    const [refreshMessage, setRefreshMessage] = useState(null)
    const [messages, setMessages] = useState(null)
    const [messagesLikes, setMessagesLikes] = useState(null)
    const [likesUser, setLikesUser] = useState(null)
    const [pictures, setPictures] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    //Récupération des messages
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/groups/' + actifGroup.uuid + '/messages')
                const groupMessages = await response.json()
                setMessages(groupMessages)
            } catch {
                console.error('Erreur de récupération des messages')
                setError(() => true)
            }

        }
        fetchData();
    }, [refreshMessage]);

    //Récupération des likes messages
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/like/message/' + actifGroup.uuid)
                const likes = await response.json()
                setMessagesLikes(likes.likes)
            } catch {
                console.error('Erreur de récupération les likes messages')
                setError(() => true)
            }
        }
        fetchData();
    }, [refreshMessage]);

    //Récupération des likes de l'utilisateur
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/like/message/' + actifGroup.uuid + '/user')
                const likesUser = await response.json()
                setLikesUser(likesUser.likes)
            } catch {
                console.error('Erreur de récupération les likes')
                setError(() => true)
            }
        }
        fetchData();
    }, [refreshMessage]);

    //Récupération des photos de profils
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getData('/users/pictures')
                const pictures = await response.json()
                setPictures(pictures)
            } catch {
                console.error('Erreur de récupération de la photo de profil')
            }
        }
        fetchData();
    }, [refreshMessage]);

    //Quand tout est chargé on supprime le chargement
    useEffect(() => {
        async function endLoading() {
            if (messages && messagesLikes && likesUser) {
                setLoading(() => false)
            }
        }
        endLoading()
    }, [messages, messagesLikes, likesUser])
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    // on attend que la récupération des éléments pour afficher la page
    return <>
        {error ? <Error /> :
            loading ? <Loading /> : <main className='main'>
                {isDesktopOrLaptop &&
                    <MyGroupsLaptop myGroups={myGroups} onChange={onChange} refreshMessage={setRefreshMessage}></MyGroupsLaptop >
                }
                {isTabletOrMobile &&
                    <MyGroups myGroups={myGroups} onChange={onChange} refreshMessage={setRefreshMessage}></MyGroups>
                }
                <GroupDescription actifGroup={actifGroup} refreshMyGroups={refreshMyGroups} />
                <InviteForm identity={identity} actifGroup={actifGroup} />
                <FormMessage actifGroup={actifGroup} identity={identity} refreshMessage={setRefreshMessage} />
                <Messages messages={messages} refreshMessage={setRefreshMessage} actifGroup={actifGroup} identity={identity} messagesLikes={messagesLikes} likesUser={likesUser} pictures={pictures} />
            </main>}
    </>

}