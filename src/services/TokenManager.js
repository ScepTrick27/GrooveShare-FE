import axios from "axios";
import {jwtDecode} from "jwt-decode";

const TokenManager = {
    tokenExpirationCheckInterval: null,

    interceptor: axios.interceptors.request.use(config => {

      if (config.url.includes('spotify')) {
        const spotifyToken = TokenManager.getSpotifyToken();
        console.log("Mortii mei"+ spotifyToken)
        if(spotifyToken){
          config.headers.Authorization = `Bearer ${spotifyToken}`
        }

          return config; 
      }
  
      const accessToken = TokenManager.getAccessToken();
      if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          if (!TokenManager.tokenExpirationCheckInterval) {
              TokenManager.scheduleTokenExpirationCheck();
          }
      }
  
      return config;
  }),

    scheduleTokenExpirationCheck: () => {
        if (!TokenManager.tokenExpirationCheckInterval) {
          TokenManager.tokenExpirationCheckInterval = setInterval(() => {
            TokenManager.checkTokenExpiration();
          }, 11 * 60 * 1000);
        }
      },

      checkTokenExpiration: () => {
        const accessToken = TokenManager.getAccessToken();
    
        if (accessToken) {
          const claims = jwtDecode(accessToken);
          const expirationTime = claims.exp * 1000; 
    
          if (Date.now() > expirationTime) {
            TokenManager.clear();
            console.log('Expired token removed from localStorage.');
          } else {
            console.log('Token is still valid.');
          }
        } else {
          console.log('No token found in localStorage.');
        }
      },

    getAccessToken: () => localStorage.getItem('accessToken'),

    getClaims: () => {
        if (!localStorage.getItem('claims')) {
            return undefined;
        }
        return JSON.parse(localStorage.getItem('claims'));
    },

    setAccessToken: (token) => {
        localStorage.setItem('accessToken', token);
        const claims = jwtDecode(token);
        localStorage.setItem('claims', JSON.stringify(claims));

        return claims;
    },

    getSpotifyToken: () => sessionStorage.getItem('spotifyToken'),

    setSpotifyToken: (spotifyToken) => {
      sessionStorage.setItem('spotifyToken', spotifyToken);
    },

    clear: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('claims');
        sessionStorage.removeItem('spotifyToken')
        axios.interceptors.request.eject(TokenManager.interceptor);
        
        if (TokenManager.tokenExpirationCheckInterval) {
          clearInterval(TokenManager.tokenExpirationCheckInterval);
          TokenManager.tokenExpirationCheckInterval = null;
        }
    },
};

export default TokenManager;