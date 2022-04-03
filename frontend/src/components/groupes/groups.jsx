import React, { memo } from 'react';
import { setData } from '../../api/api';
import './../../style/groups.sass'


export function Groups({ groups, token }) {
    if (groups === []) {
        return <></>
    }
    return <div className='groups'>
        {groups.groups.map(group => <div className='groups__items' key={group.id}>
            <Group group={group} token = {token} />
        </div>)}

    </div>

}

const Group = memo(function ({ group, token }) {

    const handleClick = async function (e) {
        e.preventDefault()
        const idGroup= e.target.getAttribute("uuid")

        const data = {
            groupId : idGroup
        }

        try {
            const response = await setData('/groups_users/create',token,'POST',data)
            const status = await response.status

            console.log(response.status)

            if (status == '200'){
                console.log("C'est ok")
            }else {
                console.error("Erreur status")
            }
        }catch{
            console.error("Erreur")

        }
    }
    return <>
        <p>{group.title}</p>
        <p>{group.description}</p>
        <button type='button' className='groups__items__button' uuid={group.id} onClick={handleClick}>Rejoindre le groupe</button>

    </>

})