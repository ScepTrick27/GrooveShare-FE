import axios from "axios";

const hostname = 'http://localhost:8080'

function GetAllGenres() {
    return axios.get(`${hostname}/genres`)
        .then(response => response.data)
}

export default {
    GetAllGenres
}