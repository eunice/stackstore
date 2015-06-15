'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var router = require('express').Router();
module.exports = router;

router.get('/:id', function (req, res, next) {
	mongoose.model('User')
	.findById(req.params.id)
	.populate('orders')
	.populate('reviews')
	.exec()
	.then(function (user) {
		console.log(user)
		res.status(200).send(user);
	},next)

});

router.get('/', function (req, res, next) {
	mongoose.model('User')
	.findById(req.user._id)
	.populate('orders')
	.populate('reviews')
	.exec()
	.then(function (user) {
		res.status(200).send(user);
	},next)

});

router.post('/', function(req, res, next) {
	mongoose.model('User')
	.findById(req.user._id)
	.exec()
	.then(function(user){
		user.cart.push(req.body.item);
		console.log(user);
		user.save(function(err, user) {
			console.log(user);
			res.status(200).send(user)
		})
	}, next)
})

router.post('/review', function(req, res, next) {
	req.body.userId = req.user._id.toString();
	console.log(req.body)
	mongoose.model('Review')
	.create(req.body)
	.then(function (review) {
		mongoose.model('User')
		.findById(req.user._id)
		.exec()
		.then(function(user){
			user.reviews.push(review._id);
			console.log('here')
			return user.save(function(err, user) {
				console.log(user);
			})
		})
		.then(function (user) {
			mongoose.model('Product')
			.findById(req.body.productId)
			.exec()
			.then(function (product) {
				console.log('here2')
				product.reviews.push(review._id);
				product.save(function (err, product) {
					console.log(product);
					res.status(200).send(review);
				})
			})
		})
	})
})

router.delete('/:id', function(req, res, next) {
	mongoose.model('User')
	.findById(req.user._id)
	.exec()
	.then(function (user) {
		user.cart = user.cart.filter(function(id){
			return id !== req.params.id;
		})
		user.save(function(err, user) {
			if (err) {
				res.status(404).send(err.message)
			} else {
				console.log(user)
				res.status(200).send(user)
			}
		})
	}, next)

})

router.delete('/', function(req, res, next) {
	mongoose.model('User')
	.findById(req.user._id)
	.exec()
	.then(function (user) {
		user.cart = [];
		user.save(function(err, user) {
			if (err) {
				res.status(404).send(err.message)
			} else {
				console.log(user)
				res.status(200).send(user)
			}
		})
	}, next)

})