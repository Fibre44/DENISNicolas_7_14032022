import React, { memo } from 'react';


export function Groups({ groups }) {
    if (groups === []) {
        return <></>
    }
    return <>
        {groups.groups.map(group => <div key={group.id}>
            <Group group={group} />
        </div>)}
    </>
}

const Group = memo(function ({ group }) {
    return <div>
        <div>
            <div>{group.title}</div>
            <div>{group.description}</div>

        </div>
    </div>
})