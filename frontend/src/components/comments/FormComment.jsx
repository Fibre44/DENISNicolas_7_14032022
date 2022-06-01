import { useState } from "react";
import { setData } from "./../../api/api"
import './../../style/button.sass';
import './../../style/form.sass'
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons } from '@fortawesome/free-solid-svg-icons'

export function FormComment({ messageId, refreshComment, actifGroup, identity, method, commentId, comment, setEditMode }) {
    const [pickerVisible, setPickerVisible] = useState(false)
    const [inputStr, setInputStr] = useState(comment);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setPickerVisible(() => false)
    };
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
            refreshComment(() => Date.now())
            if (method == 'PUT') {
                setEditMode(() => false)
            }
        } catch {

            console.error("echec")
        }
    }

    return <form onSubmit={postComments} className='form--comment'>
        <label htmlFor="comment" ></label>
        <input type="text" id="comment" name="comment" placeholder="Taper votre commentaire ici" value={inputStr} onChange={e => setInputStr(e.target.value)}></input>
        <div className='formMessage__actions'>
            <FontAwesomeIcon icon={faIcons} onClick={() => setPickerVisible(true)} />
            <button type="submit" className='button'>Poster votre commentaire</button>
        </div>
        {pickerVisible ? (<div>
            {chosenEmoji ? (
                <span>Choix: {chosenEmoji.emoji}</span>
            ) : (
                <span>Rien dans la selection</span>
            )}
            <Picker onEmojiClick={onEmojiClick} />
        </div>) : (null)}
    </form>
}