'use client';
import axios from 'axios';

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: 'https://api.homemobilestore.com/api', // or your production base URL
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, 
  });

  return instance;
};

export default useAxiosPublic;
