import React, { useEffect, useState } from 'react';
import { FormMessage } from "./messages/FormMessage";
import { MyGroups, MyGroupsLaptop } from "./groupes/Groups";
import { Messages } from "./messages/Messages";
import { GroupDescription } from "./groupes/GroupDescription"
import './../style/main.sass'
import { getData } from '../api/api';
import { useMediaQuery } from 'react-responsive'
import { InviteForm } from './invite/InviteForm';


export function Feed({ actifGroup, identity, myGroups, onChange, refreshMyGroups }) {
    const [refreshMessage, setRefreshMessage] = useState(null)
    const [messages, setMessages] = useState(null)
    const [messagesLikes, setMessagesLikes] = useState(null)
    const [likesUser, setLikesUser] = useState(null)

    //Récupération des messages
    useEffect(() => {
        async function fetchData() {
            const response = await getData('/groups/' + actifGroup.uuid + '/messages')
            const groupMessages = await response.json()
            setMessages(groupMessages)
        }
        fetchData();
    }, [refreshMessage]);

    //Récupération des likes messages
    useEffect(() => {
        async function fetchData() {
            const response = await getData('/like/message/' + actifGroup.uuid)
            const likes = await response.json()
            setMessagesLikes(likes.likes)
        }
        fetchData();
    }, [refreshMessage]);

    //Récupération des likes de l'utilisateur
    useEffect(() => {
        async function fetchData() {
            const response = await getData('/like/message/' + actifGroup.uuid + '/user')
            const likesUser = await response.json()
            setLikesUser(likesUser.likes)
        }
        fetchData();
    }, [refreshMessage]);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    // on attend que la récupération des éléments pour afficher la page
    if (messages && messagesLikes && likesUser) {
        return <main className='main'>
            {isDesktopOrLaptop &&
                <MyGroupsLaptop myGroups={myGroups} onChange={onChange} refreshMessage={setRefreshMessage}></MyGroupsLaptop >
            }
            {isTabletOrMobile &&
                <MyGroups myGroups={myGroups} onChange={onChange} refreshMessage={setRefreshMessage}></MyGroups>
            }
            <GroupDescription actifGroup={actifGroup} refreshMyGroups={refreshMyGroups} />
            <InviteForm identity={identity} actifGroup={actifGroup} />
            <FormMessage actifGroup={actifGroup} identity={identity} refreshMessage={setRefreshMessage} />
            <Messages messages={messages} refreshMessage={setRefreshMessage} actifGroup={actifGroup} identity={identity} messagesLikes={messagesLikes} likesUser={likesUser} />
        </main>
    } else {
        return null
    }


}