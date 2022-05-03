import React from "react";
import { FormMessage } from "./messages/FormMessage";
import { MyGroups } from "./groupes/Groups";
import { Messages } from "./messages/Messages";
import { GroupDescription } from "./groupes/GroupDescription"
import './../style/main.sass'

export function Feed({ actifGroup, token, identity, myGroups, onChange, messages, refreshMessage, refreshMyGroups }) {
    return <main className='main'>
        <MyGroups myGroups={myGroups} onChange={onChange} refreshMessage={refreshMessage}></MyGroups>
        <GroupDescription actifGroup={actifGroup} token={token} refreshMyGroups={refreshMyGroups} />
        <FormMessage actifGroup={actifGroup} token={token} identity={identity} refreshMessage={refreshMessage} />
        <Messages messages={messages} refreshMessage={refreshMessage} token={token} actifGroup={actifGroup} identity={identity} />
    </main>
}