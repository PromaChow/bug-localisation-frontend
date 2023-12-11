import axios from 'axios';

const axiosServices = axios.create({
    baseURL: process.env.REACT_APP_SERVICE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

// TODO

export default axiosServices;
