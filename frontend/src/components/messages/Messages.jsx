import React, { useEffect, useState, memo } from "react";
import ReactPaginate from 'react-paginate';
import './../../style/message.sass';
import { EditFormMessage } from "./EditFormMessage";
import { FormComment } from "../comments/FormComment";
import { Comments } from "../comments/Comments";
import { getData, setData } from './../../api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const items = [];

export function Messages({ messages, refreshMessage, actifGroup, identity, messagesLikes, likesUser }) {
    if (messages) {
        if (messages.messages.length == 0) {
            return <>
                <p>Le groupe ne contient pas encore de message</p>
            </>
        } else {

            return <div className='messages'>
                {messages.messages.map(message => <div className='messages__items' key={message.id} data-id={message.id} >
                    <Message key={message.id} message={message} refreshMessage={refreshMessage} actifGroup={actifGroup} identity={identity} messsageLikes={messagesLikes.find(like => like.idelement === message.id)} likesUser={likesUser.find(like => like.idelement === message.id)} />
                </div>)}
            </div>
        }
    }
}
const Message = memo(function ({ message, refreshMessage, actifGroup, identity, messsageLikes, likesUser }) {

    let color = 'dark'
    let countLike = null
    const [editMode, setEditMode] = useState(false)
    const [commentPost, setCommentPost] = useState(false)
    let messageLayout = <p className='messages__message'>{message.message} </p>
    let formComment = null
    let commentsData = null
    const [comments, setComments] = useState(null)
    const [refreshComment, setRefreshComment] = useState(null)

    if (likesUser) {
        color = '#1877f2'
    }
    if (messsageLikes) {
        countLike = messsageLikes.count
    }
    useEffect(async function () {
        const response = await getData('/groups/' + actifGroup.uuid + '/message/' + message.id + '/comments')
        const groupComments = await response.json()
        setComments(groupComments)

    }, [refreshComment])

    if (editMode) {
        messageLayout = <EditFormMessage messageId={message.id} messsageText={message.message} actifGroup={actifGroup.uuid} refreshMessage={refreshMessage} editMode={setEditMode} />

    } else {
        messageLayout = <p className='messages__message'>{message.message} </p>
    }
    formComment = <FormComment messageId={message.id} identity={identity} refreshComment={setRefreshComment} actifGroup={actifGroup.uuid} setCommentPost={setCommentPost} method='POST' />
    commentsData = <Comments comments={comments} refreshComment={setRefreshComment} actifGroup={actifGroup} identityId={identity.id} messageId={message.id} />
    let icons = null
    if (message.userId === identity.id) {
        icons = <MessageIcons setEditMode={setEditMode} messageId={message.id} actifGroup={actifGroup} refreshMessage={refreshMessage} />

    } else {
        icons = <div className='messages__head__icons'></div>
    }

    const addLike = async function (e) {
        e.preventDefault()
        const data = {
            groupId: actifGroup.uuid,
            type: 'message',
            idelement: message.id
        }
        try {
            let action = null
            if (likesUser) {
                action = 'DELETE'
            } else {
                action = 'POST'
            }
            const postLike = await setData('/like', action, data)
            const status = await postLike.status
            refreshMessage(Date.now())
            if (status == '200') {
                countLike += 1
            }
        } catch {
            console.error("echec impossible de like")
        }
    }

    return <>
        <div className='messages__head'>
            <p className='messages__autor'>Auteur {message.autor}</p>
            {icons}
        </div>
        {messageLayout}
        <div className='messages__footer'>
            <div className='messages__date'>Publié : {message.updatedAt}</div>
            <div className='messages__footer__icons'>
                {likesUser ? (<span className='messages__like'>{countLike}</span>) : <span></span>}
                <FontAwesomeIcon icon={faThumbsUp} onClick={addLike} color={color} />
            </div>
        </div>
        <div className='messages__comments'>
            {formComment}
            {commentsData}
        </div>

    </>
})

function MessageIcons({ setEditMode, messageId, actifGroup, refreshMessage }) {

    const deleteMessage = async function (e) {
        e.preventDefault()
        try {
            const data = {
                groupId: actifGroup.uuid
            }
            try {
                const deleteMessageAPI = await setData('/message/' + messageId, 'DELETE', data)
                const status = await deleteMessageAPI.status
                refreshMessage(() => messageId + Date.now())

            } catch {
                console.error('Erreur au niveau de l\'API')
            }
        } catch {
            console.error('Impossible de trouver l\'id')
        }
    }

    return <div className='messages__head__icons'>
        <FontAwesomeIcon icon={faPencil} className='messages__edit' onClick={() => setEditMode(true)} />
        <FontAwesomeIcon icon={faTrash} className='messages__trash' onClick={deleteMessage} />
    </div>

}

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <div>
                        <h3>Item #{item}</h3>
                    </div>
                ))}
        </>
    );
}

function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="Page suivante >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Page précédente"
                renderOnZeroPageCount={null}
            />
        </>
    );
}


