'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();
module.exports = router;

router.get('/', function (req, res, next) {
	mongoose.model('Product')
	.find({hero: req.user._id})
	.exec()
	.then(function (products) {
		res.json(products);
	},next)
});

router.get('/:ids', function(req, res, next) {
	var ids = req.params.ids.split(',');
	mongoose.model('Order')
	.find({ 'items.productId' : { $in: ids }})
	.populate('userId')
	.populate('items.productId')
	.exec()
	.then(function(orders) {
		orders.map(function (order) {
			order.items = order.items.filter(function (item) {
				if (!item.productId.hero) return false;
				return (item.productId.hero.toString() === req.user._id.toString());
			})
			return order;
		})
		res.json(orders);
	}, next)
});

router.post('/', function (req, res, next) {
	req.body.hero = req.user._id;
	mongoose.model('Product').create(req.body)
	.then(function(productinfo) {
		res.json(productinfo);
	}, next)
});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	mongoose.model('Product').findOneAndUpdate({_id: id}, req.body)
	.exec()
	.then(function(product){
		res.json(product)
	}, next);
})

router.delete('/:id', function (req, res, next) {
	var id = req.params.id;
	mongoose.model('Product').findOneAndRemove({_id: id})
	.exec()
	.then(function(product){
		res.json(product)
	}, next)
});
