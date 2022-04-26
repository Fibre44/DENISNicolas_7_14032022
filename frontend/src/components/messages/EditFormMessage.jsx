import React from "react";
import { setData } from "./../../api/api"

export function EditFormMessage({ messageId, messsageText, actifGroup, token, refreshMessage, editMode }) {

    const updateMessage = async function (e) {
        e.preventDefault()
        const data = {
            groupId: actifGroup,
            message: e.target.editFormMessage.value
        }
        try {
            const putMessage = await setData('/message/' + messageId, token, 'PUT', data)
            const status = await putMessage.status
            refreshMessage(() => messageId + Date.now())
            editMode(() => false)

        } catch {
            console.error('Erreur mise à jour message')
        }
    }

    return <div>
        <form action="" onSubmit={updateMessage}>
            <label htmlFor="editFormMessage">Editer votre message</label>
            <input type="text" id="editFormMessage" name="editFormMessage" placeholder={messsageText} ></input>
            <button type="submit">Editer votre message</button>

        </form>

    </div>

}