import React, { useState } from 'react';
import { setData } from "./../../api/api"
import './../../style/formMessage.sass'
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons, faL } from '@fortawesome/free-solid-svg-icons'


export function FormMessage({ actifGroup, token, identity, refreshMessage }) {
    const [pickerVisible, setPickerVisible] = useState(false)
    const [inputStr, setInputStr] = useState('');


    const postMessage = async function (e) {
        e.preventDefault()

        const data = {
            groupId: actifGroup.uuid,
            message: e.target.message.value,
            autor: identity.firstname + ' ' + identity.lastname
        }
        try {
            const postMessage = await setData('/message', token, 'POST', data)
            const status = postMessage.status
            refreshMessage(() => data.message)
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
        <form onSubmit={postMessage} className='formMessage'>
            <label htmlFor="message" ></label>
            <input type="text" id="message" name="message" placeholder="Taper un message ici" value={inputStr} onChange={e => setInputStr(e.target.value)} required></input>
            <label htmlFor="img"></label>
            <input type="file" id="img" name="img" />
            <FontAwesomeIcon icon={faIcons} onClick={() => setPickerVisible(true)} />
            {pickerVisible ? (<div>
                {chosenEmoji ? (
                    <span>You chose: {chosenEmoji.emoji}</span>
                ) : (
                    <span>No emoji Chosen</span>
                )}
                <Picker onEmojiClick={onEmojiClick} />
            </div>) : (null)}


            <button type="submit">Poster votre message sur {actifGroup.groupName}</button>
        </form>

    </>
}