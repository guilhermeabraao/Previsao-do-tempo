const axios = require('axios');

export const api = axios.create({
    baseURL: 'http://apiadvisor.climatempo.com.br'
})