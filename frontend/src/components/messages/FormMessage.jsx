import React, { useState, useRef } from 'react';
import { postFormData } from "./../../api/api"
import './../../style/formMessage.sass'
import './../../style/button.sass'
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons } from '@fortawesome/free-solid-svg-icons'


export function FormMessage({ actifGroup, identity, refreshMessage }) {
    const [pickerVisible, setPickerVisible] = useState(false)
    const [inputStr, setInputStr] = useState('');
    const form = useRef(null)

    const onSubmit = async function (e) {
        e.preventDefault()
        //const form = e.target
        const formData = new FormData(form.current)
        //Si on a pas d'image on supprime l'entrée du formulaire sinon erreur du backend voir pour traiter la situation au niveau de l'API
        if (e.target.image.value == '') {
            formData.delete('image')
        }
        formData.append('groupId', actifGroup.uuid)
        formData.append('autor', identity.firstname + ' ' + identity.lastname)
        try {
            const postMessage = await postFormData('/message', 'POST', formData)
            const status = postMessage.status
            refreshMessage(() => Date.now())
            setInputStr(() => '')
        } catch {
            console.error("echec")
        }
    }
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setPickerVisible(() => false)
    };

    return <>
        <form ref={form} onSubmit={onSubmit} className='formMessage' encType='multipart/form-data'>
            <label htmlFor="message" ></label>
            <input type="text" id="message" name="message" placeholder="Taper un message ici" value={inputStr} onChange={e => setInputStr(e.target.value)} className='formMessage__input' required />
            <label htmlFor="description">Description de l'image</label>
            <input type="text" id="description" name="description" />
            <input type="file" id="image" name="image" />
            <div className='formMessage__actions'>
                <FontAwesomeIcon icon={faIcons} onClick={() => setPickerVisible(true)} />
                <input type="submit" className='button' value='Poster votre message' />
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

    </>

}