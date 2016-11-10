const rumor = require('rumor')('unoeuro:dns');

module.exports = function (client, obj, record) {
	const url = `/my/products/${obj}/dns/records/${record}`;

	return client.delete(url)
		.then(r => r.data)
		.then(rumor.debug)
		.catch(r => {
			throw new Error(r.response.data.message);
		});
};
