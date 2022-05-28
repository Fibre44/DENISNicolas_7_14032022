import { useState } from "react";
import { setData } from "./../../api/api"
import './../../style/button.sass';
import './../../style/formComment.sass'
import Picker from 'emoji-picker-react';


export function FormComment({ messageId, refreshComment, actifGroup, setCommentPost, identity, method, commentId, comment, setEditMode }) {
    const [pickerVisible, setPickerVisible] = useState(false)
    const [inputStr, setInputStr] = useState(comment);
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
            comment: inputStr,
            autor: autor
        }
        try {
            const postMessage = await setData('/comment' + '/' + commentId, method, data)
            const status = postMessage.status
            refreshComment(() => data.messageId + Date.now())
            setCommentPost(() => false)
            if (method == 'PUT') {
                setEditMode(() => false)
            }
        } catch {

            console.error("echec")
        }
    }

    return <form onSubmit={postComments} className='form'>
        <label htmlFor="comment" ></label>
        <input type="text" id="comment" name="comment" placeholder="Taper un commentaire ici" value={inputStr} onChange={e => setInputStr(e.target.value)}></input>
        <button type="submit" className='button'>Poster votre commentaire</button>
    </form>
}