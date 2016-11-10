const rumor = require('rumor')('unoeuro:dns');

module.exports = function (client, obj) {
	return client.get(`/my/products/${obj}/dns/records`)
		.then(r => r.data)
		.then(rumor.debug)
		.catch(r => rumor.error(r.response.data));
};
