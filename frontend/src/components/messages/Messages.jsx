import React, { memo } from "react";
import './../../style/message.sass';
import { deleteData } from './../../api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons'


export function Messages({ messages, refreshMessage, token, actifGroup }) {

    if (messages) {
        if (messages.messages.length == 0) {
            return <>
                <p>Le groupe ne contient pas encore de message</p>
            </>
        } else {
            return <div className='messages'>
                {messages.messages.map(message => <div className='messages__items' key={message.id} data-id={message.id} >
                    <Message message={message} refreshMessage={refreshMessage} token={token} actifGroup={actifGroup} />
                </div>)}
            </div>
        }
    } else {
        return <>
        </>
    }
}

const Message = memo(function ({ message, refreshMessage, token, actifGroup }) {

    const searchDataId = async function (localisation) {
        if (localisation.getAttribute("data-id") != undefined) {
            return localisation.getAttribute("data-id");
        } else {
            return searchDataId(localisation.parentElement);
        }
    }
    const deleteMessage = async function (e) {
        e.preventDefault()
        try {
            const uuidMessage = await searchDataId(e.target)
            const data = {
                groupId: actifGroup.uuid
            }
            try {
                const deleteMessageAPI = await deleteData('/message/' + uuidMessage, data, token)
                const status = await deleteMessageAPI.status
                refreshMessage(() => uuidMessage)

            } catch {
                console.error('Erreur au niveau de l\'API')
            }
        } catch {
            console.error("Impossible de trouver l'id")
        }


    }

    return <>
        <div className='messages__head'>
            <p className='messages__autor'>Auteur {message.autor}</p>
            <div className='messages__head__icons'>
                <FontAwesomeIcon icon={faPencil} className='messages__edit' />
                <FontAwesomeIcon icon={faTrash} className='messages__trash' onClick={deleteMessage} />
            </div>

        </div>
        <p className='messages__message'>{message.message} </p>
        <div className='messages__footer'>
            <div className='messages__date'>Publié : {message.createdAt}</div>
            <div className='messages__footer__icons'>
                <FontAwesomeIcon icon={faThumbsUp} />
                <FontAwesomeIcon icon={faComments} onClick={deleteMessage} />
            </div>

        </div>
    </>
    //<FontAwesomeIcon icon={faComments} onClick={() => this.deleteMessage} /> fonctionne aussi

})