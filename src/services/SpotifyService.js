// var client_id = 'CLIENT_ID';
// var client_secret = 'CLIENT_SECRET';

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//   }
// });

import axios from 'axios';
import TokenManager from './TokenManager';

// spotify.api.client-id=093cbaeb546441eb81f8913087ae0fc2
// spotify.api.client-secret=7060f727ad54409d854b9b6dad2179e0

const client_id = '093cbaeb546441eb81f8913087ae0fc2';
const client_secret = '7060f727ad54409d854b9b6dad2179e0';

async function getToken() {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          'grant_type': 'client_credentials',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
          },
        }
      );
      
      const responseDataJson = JSON.parse(JSON.stringify(response.data));

      console.log("Ai de pula mea ce bine ar fi daca merge", responseDataJson.access_token);
      
      TokenManager.setSpotifyToken(responseDataJson.access_token);
      
      return responseDataJson;
    } catch (error) {
      console.error('Error getting token:', error.response.data);
      throw error;
    }
  }

  async function getTrackInfo() {
  try {
    const response = await axios.get("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
    });
    console.log(response.data)

    return response.data;

  } catch (error) {
    console.error('Error getting pula:', error.response.data);
    throw error;
  }
}

async function searchTrack(searchTerm) {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        params:{
            limit:9
        }
      });
      console.log(response.data)
      return response.data;
  
    } catch (error) {
      console.error('Error getting track info:', error.response.data);
      throw error;
    }
  }

export default {
    getToken,
    getTrackInfo,
    searchTrack
}