import axios from "axios";
import {jwtDecode} from "jwt-decode";

const TokenManager = {
    // Axios interceptor for adding Authorization header
    interceptor: axios.interceptors.request.use(config => {
        const accessToken = TokenManager.getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }),

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

        // Note: The interceptor is automatically attached when this method is called

        return claims;
    },

    clear: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('claims');

        // Eject the Axios interceptor to stop adding Authorization header
        axios.interceptors.request.eject(TokenManager.interceptor);
    },
};

export default TokenManager;