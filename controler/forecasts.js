const api = require('../climatempoAPI/api');
const token = require('../climatempoAPI/token');
const qs = require('qs');


const searchCity = async (req, res) => {
    const { city, state } = req.body;
    try {
        if (!city || !state) {
            return res.status(404).json({ mensagem: 'Necessário informar a cidade e a abreviação do estado no corpo da requisição!' })
        }

        const { data } = await api.get(`/api/v1/locale/city?name=${city}&state=${state}&&token=${token}`);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const registerCity = async (req, res, next) => {
    const { city } = req.body;
    const localeId = [city];

    try {

        const { data } = await api.put(`/api-manager/user-token/${token}/locales`, qs.stringify(localeId))
        next();

    } catch (error) {
        return res.status(400).json(error.message)
    }
}


const registeredCities = async (req, res) => {
    const cities = [];
    try {
        const { data } = await api.get(`/api-manager/user-token/${token}/locales`);
        const { locales } = data;
        for (city of locales) {
            const { data } = await api.get(`/api/v1/locale/city/${city}?token=${token}`)
            cities.push(data);
        }

        return res.status(200).json(cities);

    } catch (error) {
        return res.status(400).json(error.message)
    }
}


const forecast3Days = async (req, res) => {
    try {

        const { data } = await api.get(`/api/v1/forecast/locale/5959/hours/72?token=${token}`)
        return res.status(200).json(data);

    } catch (error) {
        return res.status(400).json(error.message)
    }

}

const temperature7Days = async (req, res) => {
    try {

        const { data } = await api.get(`/api/v2/forecast/temperature/locale/5959/hours/168?token=${token}`)
        const temperatures = [];
        let date = '';
        const temperatureValue = [0, 0];
        for (let day of data.temperatures) {
            if (date === day.date.slice(0, 10)) {

                temperatureValue[0] += day.value;
                temperatureValue[1]++;
            } else {
                if (date !== '') {
                    const obj = {
                        date,
                        value: Math.round(temperatureValue[0] / temperatureValue[1])
                    }
                    temperatures.push(obj);
                }

                date = day.date.slice(0, 10);
                temperatureValue[0] = day.value;
                temperatureValue[1] = 1;
            }
        }

        const response = { ...data, temperatures };
        return res.status(200).json(response);

    } catch (error) {
        return res.status(400).json(error.message)
    }

}


module.exports = {
    searchCity,
    registerCity,
    registeredCities,
    forecast3Days,
    temperature7Days
}