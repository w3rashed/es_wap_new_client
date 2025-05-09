'use client';
import axios from 'axios';

const useAxiosPublic = () => {
  const instance = axios.create({
    // baseURL: 'https://api.homemobilestore.com/api',
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, 
  });

  return instance;
};

export default useAxiosPublic;
