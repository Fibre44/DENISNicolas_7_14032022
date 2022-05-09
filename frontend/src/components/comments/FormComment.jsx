import React from "react";
import { setData } from "./../../api/api"

export function FormComment({ messageId, refreshComment, actifGroup, setCommentPost, identity, method, commentId }) {

    let autor = null
    if (method == 'POST') {
        commentId = ''
        autor = identity.firstname + ' ' + identity.lastname
    } else {
        autor = identity
    }
    const postComments = async function (e) {
        e.preventDefault()
        const data = {
            groupId: actifGroup,
            messageId: messageId,
            comment: e.target.comment.value,
            autor: autor
        }
        try {
            const postMessage = await setData('/comment' + '/' + commentId, method, data)
            const status = postMessage.status
            refreshComment(() => data.messageId + Date.now())
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