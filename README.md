This is a client wrapper for the [Unoeuro API](https://www.unoeuro.com/docs/api.php). To use it, you need
an account and a key for the API.

All of the methods of the library return promises.

**This library is not yet mature, and still lacks features of the UnoEuro API**. Pull requests are welcome.

## Installation

```
npm install --save unoeuro-dns
```

## Usage

```javascript
const api = require('unoeuro-dns')('ACCOUNTNO', 'KEY');

// Get all products
api.products().then(products => /* an array of product objects */ );

// Get all product objects
api.objects().then(objectNames => /* an array of object names */ );

// Get availability status for domain
api.check('domain.net').then(status => /* a status object */ );
api.available('domain.net').then(isAvailable => /* Just the boolean, please */ );

// DNS records
api.dns('object.com')
	.then(info => /* DNS info object */ );

api.records('object.com')
	.then(records => /* An array of DNS records for object.com */ );

api.recordsWhere('object.com', { type: 'A' })
	.then(records => /* An array of A records for object.com */ );

api.find('mydomain.com')
	.then(obj => /* Object name for mydomain.com; will throw if not existing */);

api.addRecord('mydomain.com', { name: '@', type: 'A', data: '100.100.100.100', ttl: 600, priority: 0 })
	.then(status => /* status for insertion */);

api.addRecords('mydomain.com', [ {...} ])
	.then(status => /* array of insertion statuses */);

api.editRecord('mydomain.com', 'RECORD_ID', { name: '@', type: 'A', data: '100.100.100.100', ttl: 600, priority: 0 })
	.then(status => /* status for edit */);

api.deleteRecord('mydomain.com', 'RECORD_ID')
	.then(status => /* deletion status */);

api.clearRecords('mydomain.com', 'A')
	.then(status => /* array of deletion statuses for A records */ );

// Buy a domain
api.buy(domain).then(status => /* status feedback on the purchase */);
```

## DNS records

When inserting or editing DNS records, the fields that can be configured are:

```javascript
const record = {
	name: '@', // Required. @ = root domain, any other string is a subdomain and * can be used for wildcards
	type: 'A', // Required. Record type (A, MX, etc.)
	data: '100.100.100.100', // Required. The IP or data for the record
	ttl: 600, // Optional. Time-To-Live for the record.
	priority: 0 // Optional. Record priority. 
};

api.addRecord('object.com', record);
```