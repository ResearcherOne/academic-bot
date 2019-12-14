const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
    throw result.error
}

const TELEGRAM_SECRET_TOKEN = process.env.TELEGRAM_SECRET_TOKEN;

module.exports = {
    TELEGRAM_SECRET_TOKEN: TELEGRAM_SECRET_TOKEN,
}