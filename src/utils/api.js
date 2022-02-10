import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://rosh-news.herokuapp.com/api"
});

export const getUsers = () => {
    return newsApi.get("/users").then(res => {
        return res.data.users;
    })
}

export const getTopics = () => {
    return newsApi.get("/topics").then(res => {
        return res.data.topics;
    })
}

export const getUser = (username) => {
    return newsApi.get(`/users/${username}`).then(res => {
        return res.data.user;
    })
}

export const getArticles = (topic, sortby, page) => {
    return newsApi.get(`/articles`, { params: { topic: topic, limit: 6, sort_by: sortby, p: page } }).then(res => {
        return res.data.articles;
    })
}

export const getArticle = (article_id) => {
    return newsApi.get(`/articles/${article_id}`).then(res => {
        return res.data.article
    })
}

export const patchArticle = (article_id, body) => {
    return newsApi.patch(`/articles/${article_id}`, body).then(res => {
        return res.data.article
    })
}

export const getComments = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`).then(res => {
        return res.data.comments
    })
}

export const postComment = (article_id, newComment) => {
    return newsApi.post(`/articles/${article_id}/comments`, newComment).then(res => {
        return res.data.comment
    })
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`).then(res => {
        //console.log(res)
        return res.status
    })
}

export const patchComment = (comment_id, body) => {
    return newsApi.patch(`/comments/${comment_id}`, body).then(res => {
        return res.data.comment;
    })
}
