import React from "react";
import { setData } from "./../../api/api"

export function FormComment({ messageId, token, firstName, lastName, refreshMessage, actifGroup, setCommentPost }) {

    const postComments = async function (e) {
        e.preventDefault()

        const data = {
            groupId: actifGroup,
            messageId: messageId,
            comments: e.target.comment.value,
            autor: firstName + ' ' + lastName
        }

        try {
            const postMessage = await setData('/comment', token, 'POST', data)
            const status = postMessage.status
            refreshMessage(() => data.messageId + Date.now())
            setCommentPost(() => false)
        } catch {

            console.error("echec")
        }
    }

    return <form onSubmit={postComments}>

        <label htmlFor="comment" ></label>
        <input type="text" id="comment" name="comment" placeholder="Taper un commentaire ici"></input>
        <button type="submit">Poster votre commentaire</button>
    </form>
}