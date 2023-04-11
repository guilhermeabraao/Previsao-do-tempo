const axios = require('axios');

const api = axios.create({
    baseURL: 'http://apiadvisor.climatempo.com.br'
})

module.exports = api;