import React from "react";
import { FormMessage } from "./messages/FormMessage";
import { MyGroups } from "./groupes/Groups";
import { Messages } from "./messages/Messages";

export function Feed({ actifGroup, actifGroupName, token, firstName, lastName, myGroups, onChange, messages, refreshMessage }) {
    return <>
        <FormMessage actifGroup={actifGroup} actifGroupName={actifGroupName} token={token} firstName={firstName} lastName={lastName} refreshMessage={refreshMessage} />
        <MyGroups myGroups={myGroups} onChange={onChange}></MyGroups>
        <Messages messages={messages} />
    </>
}