const rumor = require('rumor')('unoeuro:dns');

module.exports = function (client, obj, record, { name, data, type, ttl = 600, priority = 0 }) {
	if (!name) return Promise.reject(new Error('"name" is required when adding a DNS record.'));
	if (!data) return Promise.reject(new Error('"data" is required when adding a DNS record.'));
	if (!type) return Promise.reject(new Error('"type" is required when adding a DNS record.'));

	rumor.info(name);
	const url = `/my/products/${obj}/dns/records/${record}`;
	rumor.info(ttl);

	return client.put(url, { name, data, type, ttl, priority })
		.then(r => r.data)
		.catch(r => {
			throw new Error(r.response.data.message);
		});
};
