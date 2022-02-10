import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import ScrollContainer from "./ScrollContainer";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [sortby, setSortBy] = useState('created_at');
    const [page, setPage] = useState(1)
    let [searchParams] = useSearchParams(); //, setSearchParams
    const topic = searchParams.get('topic');

    useEffect(() => {
        getArticles(topic, sortby, page).then((res) => {
            console.log(res, '<<articles')
            setArticles(res)
        });
    }, [topic, sortby, page]);

    return (
        <div>
            <nav className="articles_header">
                <h2>{(topic) ? topic : 'Trending News'}</h2>
                <div className="articles_header_sortdiv">
                    <label>SortBy :- </label>
                    <select onChange={(event) => { setSortBy(event.target.value) }}>
                        <option value='created_at'>Article Date</option>
                        <option value='author'>Author</option>
                        <option value='title'>Title</option>
                        <option value='topic'>Topic</option>
                    </select>
                </div>
            </nav>
            <ScrollContainer>
                <section className="articles_maindiv">

                    {articles.map((article) => {
                        return (
                            <div key={article.article_id} className="art_cards">
                                <div className="art_cards_main">
                                    <h4>{article.topic}</h4>
                                    <div className="art_cards_contents">
                                        <p>{article.title}</p>
                                        <div className="art_cards_contents_author">
                                            <p>{article.author}</p>
                                            <p>{article.created_at.split('T')[0]}</p>
                                        </div>
                                        {/* <div className="art_card_footer">
                                        <p>Votes: {article.votes}</p>
                                        <Link
                                            className="articles_maindiv_moredetail"
                                            to={`/articles/${article.article_id}`}
                                        >
                                            More Detail
                                        </Link>
                                    </div> */}
                                    </div>
                                    <div className="art_card_footer">
                                        <p>Votes: {article.votes}</p>
                                        <Link
                                            className="articles_maindiv_moredetail"
                                            to={`/articles/${article.article_id}`}
                                        >
                                            More Detail
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        )
                    })}

                </section>
            </ScrollContainer>
            <div className="pagination"><Pagination count={6} shape="rounded" onChange={(evt, value) => { setPage(value) }} /></div>
        </div>
    )
}

export default Articles;

