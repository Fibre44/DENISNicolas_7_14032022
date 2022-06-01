import { useState, useRef } from "react";
import { postFormData } from "./../../api/api"
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
    const form = useRef(null)

    let autor = null
    if (method == 'POST') {
        commentId = ''
        autor = identity.firstname + ' ' + identity.lastname
    } else {
        autor = identity
    }
    const postComments = async function (e) {
        e.preventDefault()
        const formData = new FormData(form.current)
        formData.append('messageId', messageId)
        formData.append('groupId', actifGroup)
        formData.append('autor', identity.firstname + ' ' + identity.lastname)

        try {
            const postMessage = await postFormData('/comment' + '/' + commentId, method, formData)
            const status = postMessage.status
            refreshComment(() => Date.now())
            setInputStr(() => '')
            if (method == 'PUT') {
                setEditMode(() => false)
            }
        } catch {
            console.error('Erreur lors de la mise à jour du commentaire')
        }
    }

    return <form ref={form} onSubmit={postComments} className='form--comment' encType='multipart/form-data'>
        <label htmlFor="comment" ></label>
        <input type="text" id="comment" name="comment" placeholder="Taper votre commentaire ici" value={inputStr} onChange={e => setInputStr(() => e.target.value)}></input>
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