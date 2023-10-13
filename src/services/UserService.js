import axios from "axios";

const hostname = 'http://localhost:8080'

function getAllUsers() {
    return axios.get(`${hostname}/users`)
        .then(response => response.data)
}

function saveUser(userItem) {
    return axios.post(`${hostname}/users`, userItem)
        .then(response => response.data)
}

export default {
    getAllUsers,
    saveUser
}