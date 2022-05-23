import React, { useEffect, useState } from "react";
import { getData } from "../../api/api";
import './../../style/groups.sass'
import './../../style/button.sass'
import { setData } from "../../api/api";
import { Alert } from "../ui/Alert";
import { Confirmation } from "../ui/Confirmation";

export function GroupDescription({ actifGroup, refreshMyGroups }) {

    const [description, setDescription] = useState(null)
    const [error, setError] = useState(null)
    const [succes, setSucces] = useState(null)
    useEffect(async function () {
        const response = await getData('/groups/' + actifGroup.uuid)
        const description = await response.json()
        setDescription(() => description.groupe.description)
    }, [actifGroup])

    const unfollow = async function (e) {

        const data = {
            groupId: actifGroup.uuid
        }
        const unfollowGroup = await setData('/groups_users', 'DELETE', data)
        const status = (await unfollow).status
        refreshMyGroups(() => Date.now() + actifGroup)
    }

    const invite = async function (e) {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            GroupId: actifGroup.uuid,
            groupName: actifGroup.groupName
        }
        const invite = await setData('/invite', 'POST', data)
        const error = await invite.error
        if (error) {
            setError(true)
            setSucces(false)

        } else {
            setSucces(true)
            setError(false)

        }
    }


    if (description) {
        return <div className='groups__description'>
            <img src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png" alt="Groupomia" className='groups__items__img' />
            <p>{description}</p>
            <div className='groups__button'>
                <button className='button' name="unfollow" id="unfollow" onClick={unfollow} >Quitter le groupe</button>
            </div>
            <form action="" onSubmit={invite} >
                <label htmlFor="email">Inviter un utilisateur</label>
                <input type="email" name='email' id='email' required />
                <button type="submit" className="button">Inviter</button>
                <div className='alert'>
                    {error && <Alert>Oups l'utilisateur n'existe pas</Alert>}
                    {succes && <Confirmation>L'invitation a été envoyée</Confirmation>}

                </div>
            </form>

        </div>
    } else {
        return null
    }


}