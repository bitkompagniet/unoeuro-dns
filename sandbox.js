const rumor = require('rumor')();
const createApi = require('./api');

const { account, key } = process.env;

if (!account || !key) throw new Error('Please specify account and key env vars.');
