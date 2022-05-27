import { useState } from "react";
import { setData } from "./../../api/api"
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons } from '@fortawesome/free-solid-svg-icons'


export function EditFormMessage({ messageId, messsageText, actifGroup, refreshMessage, editMode }) {
    const [inputStr, setInputStr] = useState(messsageText);
    const [pickerVisible, setPickerVisible] = useState(false)

    const updateMessage = async function (e) {
        e.preventDefault()
        const data = {
            groupId: actifGroup,
            message: e.target.editFormMessage.value
        }
        try {
            const putMessage = await setData('/message/' + messageId, 'PUT', data)
            const status = (await putMessage).status
            refreshMessage(() => messageId + Date.now())
            editMode(() => false)

        } catch {
            console.error('Erreur mise à jour message')
        }
    }
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setPickerVisible(() => false)
    };

    return <div>
        <form action="" onSubmit={updateMessage}>
            <label htmlFor="editFormMessage">Editer votre message</label>
            <input type="text" id="editFormMessage" name="editFormMessage" value={inputStr} onChange={e => setInputStr(e.target.value)} ></input>
            <FontAwesomeIcon icon={faIcons} onClick={() => setPickerVisible(true)} />
            {pickerVisible ? (<div>
                {chosenEmoji ? (
                    <span>Choix: {chosenEmoji.emoji}</span>
                ) : (
                    <span>Rien dans la selection</span>
                )}
                <Picker onEmojiClick={onEmojiClick} />
            </div>) : (null)}
            <button type="submit">Editer votre message</button>

        </form>

    </div>

}