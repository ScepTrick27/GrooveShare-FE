import axios from "axios";
import TokenManager from "./TokenManager";
import SpotifyService from "./SpotifyService";

const hostname = 'http://localhost:8080'

function getAllUsers(page = 0, size = 10) {
    return axios.get(`${hostname}/users`, {
        params: {
            page: page,
            size: size
        }
    })
    .then(response => response.data);
}

function saveUser(userItem) {
    return axios.post(`${hostname}/users`, userItem)
        .then(response => response.data)
}

function LogInUser(userItem) {
    return axios.post(`${hostname}/users/tokens`, userItem, {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => {
        if (response.data && response.data.accessToken) {
            const accessToken = response.data.accessToken;
            TokenManager.setAccessToken(accessToken);
            alert("User Logged In");
            window.location.href='/'
        } else {
            alert("Invalid response from the server");
        }
    })
    .catch(err => {
        if (err.response === undefined) {
            alert(err);
        } else if (err.response.status === 401) {
            alert('Invalid credentials');
        }
    });
}

function GetLoggedInUser(id){
    return axios.get(`${hostname}/users/${id}`);
}

function UpdateUser(id, request)
{
return axios.put(`${hostname}/users/${id}`, request,{
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})
}

function DeleteUser(id)
{
return axios.delete(`${hostname}/users/${id}`,{
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})
}

function getFilteredUsers(username){
    return axios.get(`${hostname}/users/filter${username}`)
    .then(response => response.data);
}

function follow(followerId, followeeId){
    return axios.post(`${hostname}/users/follow/${followerId}/${followeeId}`)
    .then(response => response.data)
}

function unfollow(followerId, followeeId){
    return axios.post(`${hostname}/users/unfollow/${followerId}/${followeeId}`)
    .then(response => response.data)
}

function isFollowing(followerId,followeeId){
    return axios.get(`${hostname}/users/isFollowing/${followerId}/${followeeId}`)
        .then(response => response.data)
}

export default {
    getAllUsers,
    saveUser,
    LogInUser,
    GetLoggedInUser,
    UpdateUser,
    DeleteUser,
    getFilteredUsers,
    follow,
    unfollow,
    isFollowing
}