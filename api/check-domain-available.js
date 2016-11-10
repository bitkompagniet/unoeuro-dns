const rumor = require('rumor')('unoeuro:check-domain-available');

module.exports = function (client, domain) {
	return client.get(`/domaincheck/${domain}`)
		.then(r => r.data)
		.then(rumor.debug);
};
