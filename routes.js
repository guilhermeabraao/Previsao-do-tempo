const express = require('express');
const routes = express();
const { searchCity, registerCity, registeredCities, forecast3Days, temperature7Days } = require('./controler/forecasts')

routes.get('/searchCity', searchCity);
routes.put('/registerCity', registerCity, registeredCities);
routes.get('/registeredCities', registeredCities)
routes.get('/3days', forecast3Days);
routes.get('/t7days', temperature7Days);

module.exports = routes;