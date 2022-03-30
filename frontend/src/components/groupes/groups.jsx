import React, { memo } from 'react';
import './../../style/groups.sass'


export function Groups({ groups }) {
    if (groups === []) {
        return <></>
    }
    return <div className='groups'>
        {groups.groups.map(group => <div className='groups__items' key={group.id}>
            <Group group={group} />
        </div>)}

    </div>

}

const Group = memo(function ({ group }) {

    const handleClick = async function (e) {
        e.preventDefault()
        const id = e.target.getAttribute("uuid")

        console.log(id)
    }
    return <>
        <p>{group.title}</p>
        <p>{group.description}</p>
        <button type='button' className='groups__items__button' uuid={group.id} onClick={handleClick}>Rejoindre le groupe</button>

    </>

})