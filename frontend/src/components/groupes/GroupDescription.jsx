import React, { useEffect, useState } from "react";
import { getData } from "../../api/api";
import './../../style/groups.sass'
import './../../style/button.sass'
import { setData } from "../../api/api";

export function GroupDescription({ actifGroup, refreshMyGroups }) {

    const [description, setDescription] = useState(null)
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


    if (description) {
        return <div className='groups__description'>
            <img src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png" alt="Groupomia" className='groups__items__img' />
            <p>{description}</p>
            <div className='groups__button'>
                <button className='button' name="unfollow" id="unfollow" onClick={unfollow} >Quitter le groupe</button>
            </div>
        </div>
    } else {
        return null
    }


}