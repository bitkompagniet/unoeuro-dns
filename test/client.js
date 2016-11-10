/* global define describe, it */

const should = require('chai').should();

const account = 'UE180483';
const apiKey = '46TAp3U9v7QCzPmJ';

const api = require('../api')(account, apiKey);
const rumor = require('rumor')('unoeuro:test:client');

describe('Domain availability check', function() {
	this.timeout(20000);

	it('should see svift.net as unavailable', function() {
		return api.available('svift.net').then(r => r.should.not.be.ok);
	});

	it('should see kahsdernf.dk as available', function() {
		return api.available('kahsdernf.dk').then(r => r.should.be.ok);
	});

	it('should return an availability object for svift.net', function() {
		return api.check('svift.net')
			.then(r => {
				r.should.be.an('object');
				r.should.have.all.keys('domain', 'message', 'status');
				r.domain.should.have.all.keys('name', 'status', 'available');
			});
	});
});

describe('Own domains', function() {
	this.timeout(20000);

	describe('.objects', function() {
		it('should return an array of object names', function() {
			return api.objects()
				.then(objects => {
					objects.should.be.an('array');
					objects.forEach(o => {
						o.should.be.a('string');
					});
				});
		});
	});

	describe('.dns', function() {
		it('returns dns info for the first object', function() {
			return api.objects()
				.then(results => api.dns(results[0]))
				.then(result => {
					should.exist(result);
					result.should.have.all.keys('serial', 'name', 'origin');
				});
		});
	});

	describe('.records', function() {
		it('should return records for the first object', function() {
			return api.objects()
				.then(results => api.records(results[0]))
				.then(records => {
					records.should.be.an('array');

					records.forEach(record => {
						record.should.be.an('object');
						record.should.have.all.keys('record_id', 'name', 'ttl', 'data', 'type', 'priority');
					});
				});
		});
	});
});
