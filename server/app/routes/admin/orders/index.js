'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();
module.exports = router;

//Check if user is admin, if yes, proceed to other routes
router.use(function (req, res, next) {
	// console.log('req.user',req.user)
	if (req.user && (req.user.userType === "Admin")) next();
	else res.status(401).send('No authenticated admin')
})

router.get('/', function(req, res, next){
	console.log('getorder route', req.query)
	// var id = req.params.id ? {_id: req.params.id} : {};
	var params = req.query.status ? {status: req.query.status } : {};

	// params = {category: "comedian" }

	mongoose.model('Order').find(params)
		.exec()
		.then(function(orders){
			res.send(orders);
		}, next);
});

router.get('/:id', function(req, res, next){
	console.log('getorder by id route', req.params)
	// var id = req.params.id ? {_id: req.params.id} : {};
	var id = req.params.id;

	mongoose.model('Order').findOne({_id: id})
		.populate('items.productId')
		.exec()
		.then(function(order){
			console.log('send product back by id',order)
			res.send(order);
		}, next);
});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('editorderroute', req.body)

	mongoose.model('Order').findOneAndUpdate({_id: id}, {status: req.body.params})
		.exec()
		.then(function(order){
			res.send(order)
		}, next);
})

// router.delete('/:id', function (req, res, next) {
// 	var id = req.params.id;
// 	console.log('delete',id)
// 	mongoose.model('Product').findOneAndRemove({_id: id})
// 	.exec()
// 	.then(function(product){
// 		res.send(product)
// 	}, next)
//
// });
//
// router.post('/', function (req, res, next) {
// 	// console.log('hit create product route', req.body)
//     mongoose.model('Product').create(req.body)
// 		.then(function(productinfo) {
//           res.send(productinfo);
//       }, next);
// });
//
