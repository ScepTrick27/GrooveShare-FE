import axios from "axios";
import TokenManager from "./TokenManager";

const hostname = 'http://localhost:8080'

function getAllUsers() {
    return axios.get(`${hostname}/users`)
        .then(response => response.data)
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
    return axios.get(`${hostname}/users/${id}`, id)
    // .then(response => response.data.id)
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

export default {
    getAllUsers,
    saveUser,
    LogInUser,
    GetLoggedInUser,
    UpdateUser
}