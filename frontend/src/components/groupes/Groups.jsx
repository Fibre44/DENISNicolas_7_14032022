import React, { memo, useState } from 'react';
import { setData } from '../../api/api';
import './../../style/groups.sass'
import './../../style/button.sass'
import { FormGroup } from './FormGroup';
import logo from './../../img/icon-left-font.png'


//Optimisation à prévoir revenir à deux composants

export function Groups({ groups }) {
    if (groups === []) {
        return <></>
    }
    return <div className='groups'>
        <FormGroup method='POST' />
        {groups.groups.map(group => <div className='groups__items' key={group.id}>
            <Group group={group} />
        </div>)}

    </div>

}

const Group = memo(function ({ group }) {
    const [image, setImage] = useState(null)
    const [imageDescription, setImageDescription] = useState(null)

    const handleClick = async function (e) {
        e.preventDefault()
        const idGroup = e.target.getAttribute("uuid")

        const data = {
            groupId: idGroup
        }
        try {
            const response = await setData('/groups_users', 'POST', data)
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
        <img src={image ? image : logo} alt={imageDescription ? imageDescription : "Groupomia"} className='groups__items__img groups__items__img--height' />
        <p>Nom du groupe: {group.title}</p>
        <p>Description : {group.description}</p>
        <button type='button' className='button' uuid={group.id} onClick={handleClick}>Rejoindre le groupe</button>
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

        return <>
            <select onChange={setActifGroup} className='groups__select' defaultValue={'Groupomania--Groupomania'}>
                {myGroups.groups.map(group => <MyGroup key={group.id} group={group} />)}
            </select>
        </>


    } else {
        return <></>
    }
}

const MyGroup = memo(function ({ group }) {
    //le groupe par default est Groupomania donc on l'indique par default

    return <>
        <option value={group.id + '--' + group.title}>{group.title}</option>
    </>

})

export function MyGroupsLaptop({ myGroups, onChange, refreshMessage }) {
    if (myGroups) {
        const setActifGroup = function (e) {
            const target = e.target.getAttribute('value').split('--')
            const uuid = target[0]
            const groupName = target[1]
            const group = {
                uuid: uuid,
                groupName: groupName
            }
            onChange(() => group)
            refreshMessage(() => group)
        }

        return <>
            <ul className='groups__ul' onClick={setActifGroup}>
                {myGroups.groups.map(group => <MyGroupLaptop key={group.id} group={group} />)}
            </ul>
        </>


    } else {
        return <></>
    }
}

const MyGroupLaptop = memo(function ({ group }) {

    return <>
        <li value={group.id + '--' + group.title} className='groups__li'>{group.title}</li>
    </>

})


