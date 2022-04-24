import React, { useEffect, useState, memo } from "react";
import ReactPaginate from 'react-paginate';
import './../../style/message.sass';
import { EditFormMessage } from "./EditFormMessage";
import { FormComment } from "../comments/FormComment";
import { Comments } from "../comments/Comments";
import { getData, deleteData } from './../../api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons'

const items = [];

export function Messages({ messages, refreshMessage, token, actifGroup }) {

    if (messages) {
        if (messages.messages.length == 0) {
            return <>
                <p>Le groupe ne contient pas encore de message</p>
            </>
        } else {
            const length = items.length
            items.splice(0, length)
            return <div className='messages'>
                {messages.messages.map(message => <div className='messages__items' key={message.id} data-id={message.id} >
                    <Message message={message} refreshMessage={refreshMessage} token={token} actifGroup={actifGroup} />
                </div>)}
                <PaginatedItems itemsPerPage={5} />,

            </div>
        }
    } else {
        return <>
        </>
    }
}
const Message = memo(function ({ message, refreshMessage, token, actifGroup }) {

    const [editMode, setEditMode] = useState(false)
    const [commentPost, setCommentPost] = useState(false)
    let messageLayout = <p className='messages__message'>{message.message} </p>
    let formComment = null
    const [comments, setComments] = useState(null)

    useEffect(async function () {
        const response = await getData('/groups/' + actifGroup.uuid + '/message/' + message.id + '/comments', token)
        const groupComments = await response.json()
        setComments(groupComments)

    }, [refreshMessage])

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
            console.error('Impossible de trouver l\'id')
        }
    }

    if (editMode) {
        messageLayout = <EditFormMessage messageId={message.id} messsageText={message.message} actifGroup={actifGroup.uuid} token={token} refreshMessage={refreshMessage} editMode={setEditMode} />

    } else {
        messageLayout = <p className='messages__message'>{message.message} </p>
    }
    if (commentPost) {
        formComment = <FormComment messageId={message.id} token={token} firstName="test" lastName="test" refreshMessage={refreshMessage} actifGroup={actifGroup.uuid} setCommentPost={setCommentPost
        } />
    } else {
        formComment = <Comments comments={comments} />
    }

    return <>
        <div className='messages__head'>
            <p className='messages__autor'>Auteur {message.autor}</p>
            <div className='messages__head__icons'>
                <FontAwesomeIcon icon={faPencil} className='messages__edit' onClick={() => setEditMode(true)} />
                <FontAwesomeIcon icon={faTrash} className='messages__trash' onClick={deleteMessage} />
            </div>

        </div>
        {messageLayout}
        <div className='messages__footer'>
            <div className='messages__date'>Publié : {message.updatedAt}</div>
            <div className='messages__footer__icons'>
                <FontAwesomeIcon icon={faThumbsUp} />
                <FontAwesomeIcon icon={faComments} onClick={() => setCommentPost(true)} />
            </div>
        </div>
        <div className='messages__comment'>
            {formComment}
        </div>

    </>
    //<FontAwesomeIcon icon={faComments} onClick={() => this.deleteMessage} /> fonctionne aussi

})

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


