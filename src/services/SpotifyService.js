import axios from 'axios';
import TokenManager from './TokenManager';


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