import React, { useState } from "react";
import DialogBox from "./DialogBox";

const EditPostForm = (props) => {
    let commentBody = { ...props.comment };
    const [input, setInput] = useState(commentBody.body)

    const handleEditClose = () => {
        props.setDialogOpen(false);
    };

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(input, '<<inside submit')

        //don't have api for this 
        // patchComment(props.comment.comment_id)  // this api is for vote updates
        alert('API work is pending ............')

        setInput('')
        props.setDialogOpen(false);
    }

    const commentChangeHandler = (evt) => {
        setInput(evt.target.value)
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
                    <button onClick={handleEditClose}>Close</button>
                </div>
            </form>
        </>
    )
}

export default EditPostForm;