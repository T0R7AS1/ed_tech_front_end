import Cookies from 'universal-cookie';
import Axios from 'axios';
import apiList from './api_list.json';

const cookie = new Cookies();


function getToken() {
    if (cookie.get('token')) {
        return `Bearer ${cookie.get('token')}`;
    }
    return null;
}

export function ApiClient() {
    const api = Axios.create({
        baseURL: apiList.base_url,
        timeout: 5000,
    });

    api.interceptors.request.use((config) => (
        { ...config, headers: { ...config.headers, Authorization: getToken() } }
    ), (error) => Promise.reject(error));

    api.interceptors.response.use((response) => response, (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            cookie.remove('token', { path: '/' });
            localStorage.clear();
        } else {
            throw error;
        }
    });

    return api;
}

export const Requests = ApiClient();