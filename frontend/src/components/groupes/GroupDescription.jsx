import React, { useEffect, useState } from "react";
import { getData } from "../../api/api";

export function GroupDescription({ actifGroup, token }) {

    const [description, setDescription] = useState(null)
    useEffect(async function () {
        const response = await getData('/groups/' + actifGroup.uuid, token)
        const description = await response.json()
        setDescription(() => description.groupe.description)
    }, [actifGroup])

    if (description) {
        return <div>
            <p>{description}</p>
        </div>
    } else {
        return null
    }


}