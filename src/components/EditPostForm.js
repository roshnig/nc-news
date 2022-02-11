import React, { useEffect, useState } from "react";
import { patchComment } from "../utils/api";

const EditPostForm = (props) => {
    let commentBody = { ...props.comment };
    const [input, setInput] = useState(commentBody.body)

    const commentChangeHandler = (evt) => {
        setInput(evt.target.value)
    }

    const handleEditClose = () => {
        props.setDialogOpen(false);
    };

    const onSubmit = (event) => {
        event.preventDefault()
        const updatedBody = { body: input };
        patchComment(props.comment.comment_id, updatedBody)
            .then((res) => {
                props.setComments((currcomments) => {
                    const oldComment = currcomments.filter((comment) => {
                        return comment.comment_id === props.comment.comment_id
                    });
                    const updatedComment = { ...oldComment[0] };
                    updatedComment['body'] = input;
                    let newComments = currcomments.map((comment) => {
                        return { ...comment }
                    })
                    newComments = newComments.map(comm => comm.comment_id !== updatedComment.comment_id ? comm : updatedComment);
                    return newComments;
                })
                setInput('')
            })
            .catch((err) => {
                alert(err)
            })
        props.setDialogOpen(false);
    }

    return (
        <>
            <form onSubmit={onSubmit} className="comment_editform">
                <textarea
                    className="comment_updatepostinput"
                    onChange={(evt) => { commentChangeHandler(evt) }}
                    value={input}
                ></textarea>
                <div>
                    <button type="submit">Update</button>
                    <button type='button' onClick={handleEditClose}>Close</button>
                </div>
            </form>
        </>
    )
}

export default EditPostForm;