import React from "react";
import { FormMessage } from "./messages/FormMessage";
import { MyGroups } from "./groupes/Groups";
import { Messages } from "./messages/Messages";
import './../style/feed.sass'

export function Feed({ actifGroup, token, firstName, lastName, myGroups, onChange, messages, refreshMessage }) {
    return <>
        <div className='feed'>
            <FormMessage actifGroup={actifGroup} token={token} firstName={firstName} lastName={lastName} refreshMessage={refreshMessage} />
            <MyGroups myGroups={myGroups} onChange={onChange} refreshMessage={refreshMessage}></MyGroups>
        </div>

        <Messages messages={messages} refreshMessage={refreshMessage} token={token} actifGroup={actifGroup} />
    </>
}