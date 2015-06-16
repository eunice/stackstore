'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var router = require('express').Router();
var q = require('q');
module.exports = router;

router.put('/', function (req, res, next){
	var id = req.user._id;
	mongoose.model('User').findOneAndUpdate({_id: id}, {userType: 'Hero'})
	.exec()
	.then(function(user){
		res.json(user)
	}, next);
})

router.get('/:id', function (req, res, next) {
	mongoose.model('User')
	.findById(req.params.id)
	.populate('orders')
	.populate('reviews')
	.exec()
	.then(function (user){
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
	var createdReview;
	mongoose.model('Review')
	.create(req.body)
	.then(function (review) {
		createdReview = review;
		return mongoose.model('User')
		.findById(req.user._id)
		.exec()
		.then(function(user){
			user.reviews.push(review._id);
			return q.ninvoke(user, 'save');
		})
		.then(function (user) {
			return mongoose.model('Product')
			.findById(req.body.productId)
			.exec()
			.then(function (product) {
				product.reviews.push(review._id);
				return q.ninvoke(product,'save');
			})
		})
	})
	.then(function(){
		res.json(createdReview);
	})
	.then(null,function(err){
		res.status(401).send(err.message);
	});
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