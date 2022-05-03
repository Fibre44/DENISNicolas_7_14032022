import React, { memo } from 'react';
import { setData } from '../../api/api';
import './../../style/groups.sass'
import { FormGroup } from './FormGroup';

//Optimisation à prévoir revenir à deux composants

export function Groups({ groups, token }) {
    if (groups === []) {
        return <></>
    }
    return <div className='groups'>
        <FormGroup method='POST' token={token} />
        {groups.groups.map(group => <div className='groups__items' key={group.id}>
            <Group group={group} token={token} />
        </div>)}

    </div>

}

const Group = memo(function ({ group, token }) {

    const handleClick = async function (e) {
        e.preventDefault()
        const idGroup = e.target.getAttribute("uuid")

        const data = {
            groupId: idGroup
        }

        try {
            const response = await setData('/groups_users', token, 'POST', data)
            const status = await response.status

            if (status == '200') {
            } else {
                console.error("Erreur status")
            }
        } catch {
            console.error("Erreur")

        }
    }
    return <>
        <img src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png" alt="Groupomia" className='groups__items__img' />
        <p>Nom du groupe: {group.title}</p>
        <p>Description : {group.description}</p>
        <button type='button' className='groups__items__button' uuid={group.id} onClick={handleClick}>Rejoindre le groupe</button>
    </>

})

export function MyGroups({ myGroups, onChange, refreshMessage }) {
    if (myGroups) {
        const setActifGroup = function (e) {
            const target = e.target.value.split('--')
            const uuid = target[0]
            const groupName = target[1]
            const group = {
                uuid: uuid,
                groupName: groupName
            }
            onChange(() => group)
            refreshMessage(() => group)
        }
        return <select onChange={setActifGroup}>
            {myGroups.groups.map(group => <MyGroup key={group.id} group={group} />)}
        </select>
    } else {
        return <></>
    }
}

const MyGroup = memo(function ({ group }) {
    //le groupe par default est Groupomania donc on l'indique par default
    if (group.id === 'Goupomania') {
        return <>
            <option value={group.id + '--' + group.title} selected>{group.title} </option>
        </>
    } else {
        return <>
            <option value={group.id + '--' + group.title}>{group.title}</option>
        </>
    }
})

