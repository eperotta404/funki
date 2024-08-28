import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://api.chucknorris.io/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
