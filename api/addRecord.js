const rumor = require('rumor')('unoeuro:dns');

module.exports = function (client, obj, { name, data, type, ttl = 600, priority = 0 }) {
	if (!name) return Promise.reject(new Error('"name" is required when adding a DNS record.'));
	if (!data) return Promise.reject(new Error('"data" is required when adding a DNS record.'));
	if (!type) return Promise.reject(new Error('"type" is required when adding a DNS record.'));

	return client.post(`/my/products/${obj}/dns/records`, { name, data, type, ttl, priority })
		.catch(r => {
			throw new Error(r.response.data.message);
		})
		.then(r => r.data)
		.then(rumor.debug);
};
