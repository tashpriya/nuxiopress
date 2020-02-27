const axios = require('axios');

const expressAxios = axios.create({
  baseURL: process.env.NUXIOPRESS_API,
  headers: {
    Accept: 'application/json'
  }
});

if (process.env.API_KEY_NAME && process.env.API_KEY_VALUE) {
  expressAxios.defaults.headers.common[process.env.API_KEY_NAME] =
    process.env.API_KEY_VALUE;
}
if (process.env.API_SECRET_NAME && process.env.API_SECRET_VALUE) {
  expressAxios.defaults.headers.common[process.env.API_SECRET_NAME] =
    process.env.API_SECRET_VALUE;
}

module.exports = expressAxios;
