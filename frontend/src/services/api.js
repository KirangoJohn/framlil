import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // Change to your Bluehost URL on deployment
});

export default API;
