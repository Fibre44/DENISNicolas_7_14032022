import React, { useEffect, useState } from 'react';
import { FormMessage } from "./messages/FormMessage";
import { MyGroups } from "./groupes/Groups";
import { Messages } from "./messages/Messages";
import { GroupDescription } from "./groupes/GroupDescription"
import './../style/main.sass'
import { getData } from '../api/api';

export function Feed({ actifGroup, token, identity, myGroups, onChange, refreshMyGroups }) {
    const [refreshMessage, setRefreshMessage] = useState(null)
    const [messages, setMessages] = useState(null)
    const [messagesLikes, setMessagesLikes] = useState(null)
    const [likesUser, setLikesUser] = useState(null)

    //Récupération des messages

    useEffect(async function () {
        const response = await getData('/groups/' + actifGroup.uuid + '/messages', token)
        const groupMessages = await response.json()
        setMessages(groupMessages)

    }, [refreshMessage])


    //Récupération des likes messages

    useEffect(async function () {
        const response = await getData('/like/message/' + actifGroup.uuid, token)
        const likes = await response.json()
        setMessagesLikes(likes.likes)

    }, [refreshMessage])

    //Récupération des likes de l'utilisateur

    useEffect(async function () {
        const response = await getData('/like/message/' + actifGroup.uuid + '/user', token)
        const likesUser = await response.json()
        setLikesUser(likesUser.likes)

    }, [refreshMessage])


    // on attend que la récupération des éléments pour afficher la page
    if (messages && messagesLikes && likesUser) {
        return <main className='main'>
            <MyGroups myGroups={myGroups} onChange={onChange} refreshMessage={setRefreshMessage}></MyGroups>
            <GroupDescription actifGroup={actifGroup} token={token} refreshMyGroups={refreshMyGroups} />
            <FormMessage actifGroup={actifGroup} token={token} identity={identity} refreshMessage={setRefreshMessage} />
            <Messages messages={messages} refreshMessage={setRefreshMessage} token={token} actifGroup={actifGroup} identity={identity} messagesLikes={messagesLikes} likesUser={likesUser} />
        </main>
    } else {
        return null
    }


}