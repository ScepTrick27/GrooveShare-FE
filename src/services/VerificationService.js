import axios from "axios";

const hostname = 'http://localhost:8080'

function getAllVerifications() {
    return axios.get(`${hostname}/verifications`)
        .then(response => response.data)
}


function updateVerification(id, request)
{
    return axios.put(`${hostname}/verifications/${id}`, request,{
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
}

function GetVerificationById(id){
    return axios.get(`${hostname}/verifications/${id}`);
}

function createVerification(verificationItem) {
    return axios.post(`${hostname}/verifications`, verificationItem,{
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.data)
}
function hasUserSentVerification(userId) {
    return axios.get(`${hostname}/verifications/hasSentVerification`, {
      params: { userId }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error checking verification:', error);
      throw error;
    });
  }

  function verifyUser(id, request)
{
    return axios.put(`${hostname}/verifications/verifyUser/${id}`, request,{
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
}


export default {
    getAllVerifications,
    createVerification,
    updateVerification,
    GetVerificationById,
    hasUserSentVerification,
    verifyUser
}