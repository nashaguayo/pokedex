import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_POKEAPI_URL,
});

export default instance;
