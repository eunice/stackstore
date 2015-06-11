var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/review');
require('../../../server/db/models/user');
require('../../../server/db/models/product');


var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');


describe('User model', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('review for a product in their order history', function() {

		beforeEach('Create user, add a product, add a review', function(done) {
			User.create({ 
				email: 'obama@gmail.com', 
				password: 'potus', 
				userType: 'admin' 
			});

			Product.create({
				title: 'product1',
				description: 'great product',
				price: 100,
				quantity: 2,
				category: 'musicians'
			});
			done()
		});
		it('should allow', function(done) {
			User.find({email: 'obama@gmail.com'})
			.exec()
			.then(function(user) {
				return Review.create({
					userId: user._id,
					stars: 4,
					review: 'very good much great yum wow'
				})
			})
			.then(function (review) {
				Product.find({title: 'product1'})
				.exec()
				.then(function (product) {
					product.reviews.push(review._id);
					expect(product.reviews).to.have.length(1);
					done();
				})
			});
		})

	})