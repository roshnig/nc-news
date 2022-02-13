import React, { useEffect, useState, useContext } from "react";
import { getComments, postComment, deleteComment, patchComment } from "../utils/api";
import { UserContext } from "../contexts/User";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBox from "./DialogBox";
import EditPostForm from './EditPostForm';
import CircularLoader from './CircularLoader';
import AlertMessage from "./AlertMessage";

const Comments = (props) => {
    const [comments, setComments] = useState([]);
    const [status, setStatusBase] = React.useState("");
    const [input, setInput] = useState('');
    const { loggedInUser, isLoggedIn } = useContext(UserContext);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState({});
    const { commentVoteCount, setCommentVoteCount } = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    let img = 'https://freepikpsd.com/file/2019/10/default-profile-picture-png-1-Transparent-Images.png';

    useEffect(() => {
        getComments(props.article_id).then((res) => {
            // console.log(res, '<<Comments')
            setComments(res);
            setIsLoading(false);
        });
    }, [props.article_id]);

    const newPostHandler = (evt) => {
        if (!isLoggedIn) {
            setStatusBase({ msg: "Please login first!", key: Math.random() });
        } else {
            setInput(evt.target.value);
        }
    }

    const postSubmitHandler = (evt) => {
        if (input.length === 0) {
            setStatusBase({ msg: "Nothing to post here! Please type your comment", key: Math.random() });
        } else {
            const newComment = {};
            newComment['body'] = input;
            newComment['username'] = loggedInUser.username

            postComment(props.article_id, newComment).then((res) => {
                setComments((currcomments) => {
                    const newComments = currcomments.map((comment) => {
                        return { ...comment }
                    });
                    newComments.unshift(res)
                    return newComments;
                })
                props.setArticle((currArticle) => {
                    const updatedArticle = { ...currArticle };
                    updatedArticle['comment_count']++;
                    return updatedArticle;
                })
                setInput('');
            })
                .catch((err) => {
                    alert(err)
                    //setStatusBase({ msg: { err }, key: Math.random() });
                })
        }
    }

    const deleteHandler = (commentid) => {
        deleteComment(commentid)
            .then((res) => {
                setComments((currcomments) => {
                    const newComments = currcomments.filter((comment) => {
                        return comment.comment_id !== commentid
                    });
                    return newComments;
                })
                props.setArticle((currArticle) => {
                    const updatedArticle = { ...currArticle };
                    updatedArticle['comment_count']--;
                    return updatedArticle;
                })
            })
            .catch((err) => {
                alert(err)
                //setStatusBase({ msg: { err }, key: Math.random() });
            })
    }

    const voteHandler = (comment_id, vote) => {
        if (isLoggedIn) {
            const updatebody = { inc_votes: vote }
            setComments((currcomments) => {
                const oldComment = currcomments.filter((comment) => {
                    return comment.comment_id === comment_id
                });
                const updatedComment = { ...oldComment[0] };
                updatedComment['votes'] += vote;
                let newComments = currcomments.map((comment) => {
                    return { ...comment }
                })
                newComments = newComments.map(comm => comm.comment_id !== updatedComment.comment_id ? comm : updatedComment);
                return newComments;
            })
            patchComment(comment_id, updatebody)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    setComments((currcomments) => {
                        const oldComment = currcomments.filter((comment) => {
                            return comment.comment_id === comment_id
                        });
                        const updatedComment = { ...oldComment[0] };
                        updatedComment['votes'] -= vote;
                        let newComments = currcomments.map((comment) => {
                            return { ...comment }
                        })
                        newComments = newComments.map(comm => comm.comment_id !== updatedComment.comment_id ? comm : updatedComment);
                        return newComments;
                    })
                    alert(err)
                })
        } else {
            //alert('Please login first !!!')
            setStatusBase({ msg: "Please login first!", key: Math.random() });
        }

    }

    return isLoading ? (
        <CircularLoader></CircularLoader>
    ) : (
        <div>
            {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
            <div className="comment_postcomment_div">
                <img
                    className="comment_img"
                    src={(isLoggedIn) ? `${loggedInUser.avatar_url}` : img}
                    alt='author'></img>
                <textarea
                    className="comment_postinput"
                    onChange={newPostHandler}
                    value={input}
                    placeholder='Post your comment here ......'></textarea>
                {(isLoggedIn) ?
                    <Button variant="contained" onClick={postSubmitHandler}>Submit</Button>
                    : <Button variant="contained" disabled>Submit</Button>
                }
            </div>

            <ul className="commentslist">
                {comments.map((comment) => {
                    return <li key={comment.comment_id}>
                        <div className="comment_maindiv">
                            <div className="comment_body">
                                <img
                                    className="comment_img"
                                    src={(comment.author === loggedInUser.username) ? `${loggedInUser.avatar_url}` : img}
                                    alt='{comment.author}'>
                                </img>
                                <p className="comment_bodycontent">
                                    <span className="comment_author">{comment.author} :</span>
                                    {comment.body}
                                </p>
                            </div>
                            <div className="comment_footer">
                                <p>{comment.created_at.split('T')[0]}</p>
                                <div className="comment_footer_buttons">
                                    {(comment.author === loggedInUser.username) &&
                                        <>
                                            <IconButton onClick={() => { setDialogOpen(true); setSelectedComment(comment) }} color="primary">
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            <DialogBox
                                                title="Update Your Post"
                                                dialogOpen={dialogOpen}
                                                setDialogOpen={setDialogOpen}
                                            >
                                                <EditPostForm
                                                    comment={selectedComment}

                                                    setDialogOpen={setDialogOpen}
                                                    setComments={setComments}
                                                ></EditPostForm>
                                            </DialogBox>
                                            <IconButton onClick={() => { deleteHandler(comment.comment_id) }} color="primary">
                                                <DeleteIcon color="primary" />
                                            </IconButton>
                                            <p><ThumbUpIcon color="disabled" /> {comment.votes}</p>
                                        </>
                                    }
                                    {(comment.author !== loggedInUser.username) &&
                                        <>
                                            <IconButton color="primary" onClick={() => { voteHandler(comment.comment_id, 1) }}>
                                                <ThumbUpIcon color="primary" />
                                            </IconButton>
                                            <IconButton color="primary" onClick={() => { voteHandler(comment.comment_id, -1) }}>
                                                <ThumbDownAltIcon color="primary" />
                                            </IconButton>
                                            <p> ( {comment.votes} )</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Comments;