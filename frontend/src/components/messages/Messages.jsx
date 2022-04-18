import React, { memo } from "react";
import './../../style/message.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons'


export function Messages({ messages, refreshMessage }) {

    if (messages) {
        if (messages.messages.length == 0) {
            return <>
                <p>Le groupe ne contient pas encore de message</p>
            </>
        } else {
            return <div className='messages'>
                {messages.messages.map(message => <div className='messages__items' key={message.id}>
                    <Message key={message.id} message={message} refreshMessage={refreshMessage} />
                </div>)}
            </div>
        }
    } else {
        return <>
        </>
    }
}

const Message = memo(function ({ message, refreshMessage }) {

    const deleteMessage = async function (e) {
        e.preventDefault()
        console.log(e)

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
                <FontAwesomeIcon icon={faComments} />
            </div>

        </div>
    </>

})