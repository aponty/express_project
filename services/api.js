const axios = require('axios');
const api = {};

api.getSleepData = id => axios({
    //not doing anything with the id at the moment, but would with real api
    url: `https://extraction.import.io/query/extractor/e915f471-4635-4712-9d01-091204ee4452?_apikey=${process.env.importkey}&url=https%3A%2F%2Faponty.github.io%2Fapi_hack%2Findex.html`,
    method: 'GET'
})

module.exports = api
