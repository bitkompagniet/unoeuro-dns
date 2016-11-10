const axios = require('axios');

module.exports = function (accountName, apiKey, baseURL = 'https://api.unoeuro.com/1') {
	const path = `${baseURL}/${accountName}/${apiKey}/`;
	return axios.create({
		baseURL: path,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
