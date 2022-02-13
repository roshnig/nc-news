import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useParams } from "react-router-dom";
import { getArticle, patchArticle } from "../utils/api";
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CommentIcon from '@mui/icons-material/Comment';
import Comments from './Comments';
import CircularLoader from './CircularLoader';
import AlertMessage from "./AlertMessage";

const ArticleDetail = () => {
    const { isLoggedIn } = useContext(UserContext);
    const [article, setArticle] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatusBase] = React.useState("");
    const { article_id } = useParams()

    useEffect(() => {
        getArticle(article_id).then((res) => {
            setArticle(res);
            setIsLoading(false)
        });
    }, [article_id]);

    const commentsBtnHandler = () => {
        setOpen(!open)
    }

    const voteHandler = (vote) => {
        if (isLoggedIn) {
            const updatebody = { inc_votes: vote }
            setArticle((currArticle) => {
                const updatedArticle = { ...currArticle };
                updatedArticle['votes'] += vote;
                return updatedArticle;
            })
            patchArticle(article_id, updatebody)
                .then((res) => {
                    //console.log(res)
                })
                .catch((err) => {
                    alert(err)
                    //setStatusBase({ msg: { err }, key: Math.random() });
                    setArticle((currArticle) => {
                        const updatedArticle = { ...currArticle };
                        updatedArticle['votes'] -= vote;
                        return updatedArticle;
                    })
                })
        } else {
            setStatusBase({ msg: "Please login first!", key: Math.random() });
        }

    }

    return isLoading ? (
        <CircularLoader></CircularLoader>
    ) : (
        <div className="article_detail_card">
            {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
            <div className="article_detailcard_main">
                <h3>{article.topic}</h3>
                <div className="art_detailcard_contents">
                    <h4>{article.title}</h4>
                    <p className="article_body">{article.body}</p>
                    <div className="art_cards_contents_author">
                        <p>{article.author}</p>
                        <p>{
                            (article.created_at) ? article.created_at.split('T')[0] : ''}</p>
                    </div>

                </div>
                <div className="art_card_footer">
                    <div className="article_votesBtn_div">
                        <IconButton onClick={() => { voteHandler(1) }}>
                            <ThumbUpIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={() => { voteHandler(-1) }} color="primary">
                            <ThumbDownAltIcon color="primary" />
                        </IconButton>
                        {`(${article.votes})`}
                    </div>
                    <button
                        className="atticleDetail_commentsBtn"
                        onClick={() => { commentsBtnHandler(article.article_id) }}
                    ><CommentIcon color="primary" /> {`(${article.comment_count})`}</button>
                </div>
            </div>
            {(open) &&
                <Comments article_id={article_id} setArticle={setArticle}></Comments>
            }
        </div>
    )
}

export default ArticleDetail;