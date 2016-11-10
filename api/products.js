const rumor = require('rumor')('unoeuro:products');

module.exports = function (client) {
	return client.get('/my/products')
		.then(r => r.data)
		.then(r => r.products)
		.then(rumor.debug);
};
