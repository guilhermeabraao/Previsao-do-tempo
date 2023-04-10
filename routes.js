const express = require('express');
const routes = express();

routes.get('/', (req, res) => {
    res.json({ mensagem: 'online' })
})

module.exports = routes;