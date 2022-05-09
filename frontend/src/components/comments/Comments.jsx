import React, { memo, useState } from "react";
import './../../style/comment.sass';
import { deleteData } from "../../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons';
import { FormComment } from "./FormComment";

export function Comments({ comments, refreshComment, actifGroup, identityId, messageId }) {

    if (comments) {
        return <>
            <div className='comments'>
                {comments.comments.map(comment => <div className='comments__items' key={comment.id} data-id={comment.id}>
                    <Comment comment={comment} refreshComment={refreshComment} actifGroup={actifGroup} identityId={identityId} messageId={messageId} />
                </div>)}
            </div>
        </>
    } else {
        return <p>Chargement</p>

    }
}

const Comment = memo(function ({ comment, refreshComment, actifGroup, identityId, messageId }) {
    const [editMode, setEditMode] = useState(false)
    let iconsComment = null
    let commentData = <p className='comments__data'>{comment.comments}</p>

    if (editMode) {
        commentData = <FormComment messageId={messageId} refreshComment={refreshComment} actifGroup={actifGroup.uuid} identity={comment.autor} method='PUT' commentId={comment.id} />
    } else {
        let commentData = <p className='comments__data'>{comment.comments}</p>

    }

    if (identityId == comment.userId) {
        iconsComment = <CommentIcons commentId={comment.id} actifGroup={actifGroup} refreshComment={refreshComment} messageId={messageId} setEditMode={setEditMode} />
    } else {
        iconsComment = <div className='comments__head__icons'></div>
    }

    return <>
        <div className='comments__head'>
            <p className='comments__autor'>Auteur {comment.autor}</p>
            {iconsComment}
        </div>
        <div>
            {commentData}
        </div>

    </>
})

function CommentIcons({ commentId, actifGroup, refreshComment, messageId, setEditMode }) {

    const deleteComment = async function (e) {
        e.preventDefault()
        try {
            const data = {
                groupId: actifGroup.uuid,
                messageId: messageId
            }
            try {
                const deleteCommentAPI = await deleteData('/comment/' + commentId, data)
                const status = await deleteCommentAPI.status
                refreshComment(() => commentId + Date.now())

            } catch {
                console.error('Erreur au niveau de l\'API')
            }
        } catch {
            console.error('Impossible de trouver l\'id')
        }
    }

    return <div className='comments__head__icons'>
        <FontAwesomeIcon icon={faPencil} className='comments__edit' onClick={() => setEditMode(true)} />
        <FontAwesomeIcon icon={faTrash} className='comments__trash' onClick={deleteComment} />
    </div>
}
