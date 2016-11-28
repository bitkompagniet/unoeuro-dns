module.exports = function(client, name, action = 'register', autorenew = false) {
	if (!name) return Promise.reject(new Error('Domain name required.'));
	if (!action) return Promise.reject(new Error('Action (register/transfer) required.'));

	return client.post('/order/dnsservice', {
		domain: {
			name,
			action,
		},
		autorenew,
	})
	.then(r => r.data)
	.catch(r => {
		throw new Error(r.response.data.message);
	});
};
