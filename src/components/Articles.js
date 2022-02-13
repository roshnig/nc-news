import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CircularLoader from './CircularLoader';


const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [sortby, setSortBy] = useState('created_at');
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    let [searchParams] = useSearchParams();
    const topic = searchParams.get('topic');
    let navigate = useNavigate();

    const limit = 8;

    useEffect(() => {
        getArticles(topic, sortby, page, limit).
            then((res) => {
                //console.log(res, '<<articles')
                setArticles(res.articles);
                setIsLoading(false);
                const recordCount = res.total_count;
                if (recordCount) {
                    const pages = Math.ceil(recordCount / limit)
                    setPageCount(pages)
                }
            })
            .catch((err) => {
                alert(err);
            })
    }, [topic, sortby, page]);

    const cardClickHandler = (id) => {
        navigate(`/articles/${id}`)
    }

    return isLoading ? (
        <CircularLoader></CircularLoader>
    ) : (
        <div>
            <nav className="articles_header">
                <h2>{(topic) ? topic : 'Trending News'}</h2>
                <div className="articles_header_sortdiv">
                    <label>SortBy- </label>
                    <select onChange={(event) => { setSortBy(event.target.value) }}>
                        <option value='created_at'>Article Date</option>
                        <option value='author'>Author</option>
                        <option value='title'>Title</option>
                        <option value='topic'>Topic</option>
                        <option value='votes'>Votes</option>
                    </select>
                </div>
            </nav>

            <section className="articles_maindiv">
                {articles.map((article) => {
                    return (
                        <div key={article.article_id} className="art_cards" onClick={() => { cardClickHandler(article.article_id) }}>
                            <div className="art_cards_main">
                                <h4>{article.topic}</h4>
                                <div className="art_cards_contents">
                                    <p>{article.title}</p>
                                    <div className="art_cards_contents_author">
                                        <p>{article.author}</p>
                                        <p>{article.created_at.split('T')[0]}</p>
                                    </div>
                                </div>
                                <div className="art_card_footer">
                                    <p><ThumbUpIcon color="primary" /> {article.votes}</p>
                                    <p><CommentIcon color="primary" />{article.comment_count}</p>
                                    <Link
                                        className="articles_maindiv_moredetail"
                                        to={`/articles/${article.article_id}`}
                                    ><ReadMoreIcon color="primary" />

                                    </Link>
                                </div>
                            </div>

                        </div>
                    )
                })}

            </section>
            <div className="pagination"><Pagination count={pageCount} shape="rounded" onChange={(evt, value) => { setPage(value) }} /></div>
        </div>
    )
}

export default Articles;

