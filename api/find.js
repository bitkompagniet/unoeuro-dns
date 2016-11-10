const rumor = require('rumor')('unoeuro:products');

module.exports = function (client, name) {
	return client.get('/my/products')
		.then(r => r.data)
		.then(r => r.products)
		.then(r => r.filter(o => o.name === name))
		.then(r => {
			if (r.length === 0) throw new Error(`No object found with domain name "${name}"`);
			return r[0];
		})
		.then(r => r.object)
		.then(rumor.debug);
};
