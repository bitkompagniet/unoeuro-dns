const _ = require('lodash');
const rumor = require('rumor')('unoeuro:api');
const createClient = require('./client');
const products = require('./products');
const checkDomainAvailable = require('./check-domain-available');
const dns = require('./dns');
const records = require('./records');
const find = require('./find');
const addRecord = require('./addRecord');
const editRecord = require('./editRecord');
const deleteRecord = require('./deleteRecord');
const buyOrRedelegateDomain = require('./buyOrRedelegateDomain');

module.exports = function (accountName, apiKey, baseURL) {
	const client = createClient(accountName, apiKey, baseURL);

	const api = {};

	api.products = () => products(client);
	api.objects = () => products(client).then(r => r.map(p => p.object));
	api.check = domain => checkDomainAvailable(client, domain);
	api.available = domain => api.check(domain).then(r => Boolean(r.domain.available));
	api.dns = obj => dns(client, obj).then(r => r.zone);
	api.records = obj => records(client, obj).then(r => r.records);

	api.recordsWhere = (obj, predicate) =>
		records(client, obj)
			.then(r => r.records)
			.then(r => _.filter(r, predicate));

	api.find = name => find(client, name);
	api.addRecord = (obj, data) => addRecord(client, obj, data);
	api.addRecords = (obj, recs) => Promise.all(recs.map(record => api.addRecord(obj, record)));
	api.editRecord = (obj, record, data) => editRecord(client, obj, record, data);
	api.deleteRecord = (obj, record) => deleteRecord(client, obj, record);

	api.clearRecords = (domain, type) =>
		api
			.find(domain)
			.then(obj =>
				Promise.all([
					obj,
					api.recordsWhere(obj, { type }),
				])
			)
			.then(([obj, rec]) =>
				Promise.all(
					rec.map(record =>
						api.deleteRecord(obj, record.record_id)
					)
				)
			);

	api.buy = (domain) => buyOrRedelegateDomain(client, domain);

	return api;
};
