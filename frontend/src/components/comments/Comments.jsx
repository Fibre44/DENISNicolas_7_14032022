import React, { memo } from "react";
import './../../style/comment.sass'

export function Comments({ comments }) {

    if (comments) {
        return <>
            <div className='comments'>
                {comments.comments.map(comment => <div className='comments__items' key={comment.id} data-id={comment.id}>
                    <Comment comment={comment} />
                </div>)}
            </div>
        </>
    } else {
        return <p>Chargement</p>

    }
}

const Comment = memo(function ({ comment }) {
    return <div className='comments__head'>
        <p className='comments__autor'>Auteur {comment.autor}</p>
        <p className='comments__data'>{comment.comments}</p>
    </div>

})

