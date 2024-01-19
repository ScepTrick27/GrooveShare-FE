import axios from "axios";

const hostname = 'http://localhost:8080'

function getAllPosts(page = 0, size = 6) {
    return axios.get(`${hostname}/posts`, {
        params: {
            page: page,
            size: size
        }
    })
        .then(response => response.data)
}

function savePost(postItem) {
    return axios.post(`${hostname}/posts`, postItem,{
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.data)
}

function UpdatePost(id, request)
{
return axios.put(`${hostname}/posts/${id}`, request,{
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})
}

function DeletePost(id)
{
return axios.delete(`${hostname}/posts/${id}`,{
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})
}

function getUserPostCounts() {
    return axios.get(`${hostname}/posts/stats`)
        .then(response => response.data);
}

function getPostsByFollowers(id){
    return axios.get(`${hostname}/posts/findPostsByFollowers/${id}`)
    .then(response => response.data);
}

function getRecommendedPosts(userId){
    return axios.get(`${hostname}/posts/recommended/${userId}`)
    .then(response => response.data)
}

function getPostsByGenreId(genreId){
    return axios.get(`${hostname}/posts/byGenre/${genreId}`)
    .then(response => response.data)
}



export default {
    getAllPosts,
    savePost,
    UpdatePost,
    DeletePost,
    getUserPostCounts,
    getPostsByFollowers,
    getRecommendedPosts,
    getPostsByGenreId
}