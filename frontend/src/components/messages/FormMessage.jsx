import React from "react";
import { setData } from "./../../api/api"

export function FormMessage({ actifGroup, actifGroupName, token, firstName, lastName, refreshMessage }) {

    const postMessage = async function (e) {
        e.preventDefault()

        const data = {
            groupId: actifGroup,
            message: e.target.message.value,
            autor: firstName + ' ' + lastName
        }

        try {

            const postMessage = await setData('/message', token, 'POST', data)
            const status = postMessage.status
            refreshMessage(() => data.message)
        } catch {

            console.error("echec")
        }
    }

    return <form onSubmit={postMessage}>

        <label htmlFor="message" >Votre message</label>
        <input type="text" id="message" name="message" placeholder="Taper un message ici"></input>
        <button type="submit">Poster votre message sur {actifGroupName}</button>


    </form>

}