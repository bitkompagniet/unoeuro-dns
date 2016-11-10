const rumor = require('rumor')();
const createApi = require('./api');

const { account, key } = process.env;

if (!account || !key) throw new Error('Please specify account and key env vars.');

const api = createApi(account, key);

const desiredRecords = [
	{ name: '@', type: 'A', data: '100.99.98.97' },
	{ name: 'chat', type: 'A', data: '200.201.202.203' },
	{ name: '*', type: 'A', data: '50.50.50.50' },
];

// const oid = api.find('figuro.dk');
// const aRecords = oid.then(o => api.recordsWhere(o, { type: 'A' }));
// const firstRecord = aRecords.then(records => records[0]);

// Promise.all([oid, firstRecord])
// 	.then(([id, record]) => api.editRecord(id, record.record_id, { name: '@', data: '100.100.100.100', type: 'A' }));

// api.editRecord('figuro.dk', '3504465', {
// 	"name": "hest",
// 	"type": "A",
// 	"data": "100.100.100.0",
// 	"ttl": "600"
// }).then(rumor.info);

// api.find('figuro.dk')
// 	.then(obj => api.addRecord(obj, { name: 'www', type: 'A', data: '127.0.0.1', ttl: 600, priority: 10 }))
// 	.catch(rumor.error);


// api.products()
// 	.then(products => api.records(products[0].object))
// 	.then(records => records.forEach(rumor.info));

api.clearRecords('figuro.dk', 'A')
	.then(rumor.info)
	.then(() => api.addRecords(desiredRecords))
	.then(rumor.info);
