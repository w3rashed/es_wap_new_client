'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

const UseAxiosPrivet = () => {
    const instance = axios.create({
        // baseURL: 'https://api.homemobilestore.com/api',
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add a request interceptor
    instance.interceptors.request.use(
        (config) => {
            const token = Cookies.get('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                // Handle unauthorized access
                Cookies.remove('token');
                Cookies.remove('email');
                Cookies.remove('name');
                window.location.href = '/adminLogin';
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default UseAxiosPrivet;