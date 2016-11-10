const rumor = require('rumor')('unoeuro:dns');

module.exports = function (client, obj) {
	return client.get(`/my/products/${obj}/dns`)
		.then(r => (r.data))
		.then(rumor.debug);
};
