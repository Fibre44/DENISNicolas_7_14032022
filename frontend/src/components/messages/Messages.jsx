import React, { memo } from "react";

export function Messages({ messages }) {

    if (messages) {
        return <div className='messages'>
            {messages.messages.map(message => <div className='message__items' key={message.id}>
                <Message key={message.id} message={message} />
            </div>)}
        </div>
    } else {

        return <>
        </>
    }
}

const Message = memo(function ({ message }) {

    return <>
        <p>{message.message} date de création {message.createdAt}</p>
    </>

})