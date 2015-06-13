var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/product');
require('../../../server/db/models/order');
require('../../../server/db/models/review');


var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');
var Review = mongoose.model('Review');

describe('User model', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('review for a product in their order history', function() {
		var productID;
		beforeEach('Create user, add a product, add a review', function(done) {
			User.create({ 
				email: 'obama@gmail.com', 
				password: 'potus', 
				userType: 'Admin' 
			})
			.then(function(user) {
				Product.create({
					title: 'product1',
					description: 'great product',
					price: 100,
					quantity: 2,
					category: 'musicians'
				})
				.then(function(product) {
					productID = product._id;
					Order.create({
						userId: user._id,
						guest: false,
						items: [{
							price: product.price,
							quantity: product.quantity,
							productId: product._id
						}],
						status: 'FULFILLED'
					})
					.then(function (order) {
						user.orders.push(order._id);
						user.save(function(err, model){
							done();
						})
					})
				})
			})
		});

		it('should allow', function(done) {

			User.find({'email': 'obama@gmail.com'})
			.exec()
			.then(function(user) {
				return Review.create({
					userId: user[0]._id,
					stars: 4,
					review: 'very good much great yum wow',
					productId: productID
				})
			})
			.then(function (review) {
				Product.findOne({'title': 'product1'})
				.exec()
				.then(function (product) {
					product.reviews.push(review._id)
					product.save(function(err, product) {
						if (err) console.log(err)
						expect(product.reviews).to.have.lengthOf(1);
						done();
					})
				})
			});
		})

	})
})
