import React, { memo } from "react";
import './../../style/comment.sass';
import { deleteData } from "../../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons';

export function Comments({ comments, refreshComment, actifGroup, token, identityId }) {

    if (comments) {
        return <>
            <div className='comments'>
                {comments.comments.map(comment => <div className='comments__items' key={comment.id} data-id={comment.id}>
                    <Comment comment={comment} refreshComment={refreshComment} actifGroup={actifGroup} token={token} identityId={identityId} />
                </div>)}
            </div>
        </>
    } else {
        return <p>Chargement</p>

    }
}

const Comment = memo(function ({ comment, refreshComment, actifGroup, token, identityId }) {

    let iconsComment = null

    if (identityId == comment.userId) {
        iconsComment = <CommentIcons commentId={comment.id} token={token} actifGroup={actifGroup} refreshComment={refreshComment} />
    } else {
        iconsComment = <div className='comments__head__icons'></div>
    }

    return <>
        <div className='comments__head'>
            <p className='comments__autor'>Auteur {comment.autor}</p>
            {iconsComment}

        </div>
        <div>
            <p className='comments__data'>{comment.comments}</p>
        </div>

    </>
})

function CommentIcons({ commentId, token, actifGroup, refreshComment }) {

    const deleteComment = async function (e) {
        e.preventDefault()
        try {
            const data = {
                groupId: actifGroup.uuid
            }
            try {
                const deleteCommentAPI = await deleteData('/comment/' + commentId, data, token)
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
        <FontAwesomeIcon icon={faPencil} className='comments__edit' />
        <FontAwesomeIcon icon={faTrash} className='comments__trash' onClick={deleteComment} />
    </div>
}
