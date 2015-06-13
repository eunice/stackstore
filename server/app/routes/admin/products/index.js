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
	console.log('getproduct route', req.query)
	// var id = req.params.id ? {_id: req.params.id} : {};
	var params = req.query.category ? {category: req.query.category } : {};

	// params = {category: "comedian" }

	mongoose.model('Product').find(params)
		.exec()
		.then(function(products){
			res.send(products);
		}, next);
});

router.delete('/:id', function (req, res, next) {
	var id = req.params.id;
	console.log('delete',id)
	mongoose.model('Product').findOneAndRemove({_id: id})
	.exec()
	.then(function(product){
		res.send(product)
	}, next)

});

router.post('/', function (req, res, next) {
	// console.log('hit create product route', req.body)
    mongoose.model('Product').create(req.body)
		.then(function(productinfo) {
          res.send(productinfo);
      }, next);
});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('editproduct route', req.body)

	mongoose.model('Product').findOneAndUpdate({_id: id}, req.body)
		.exec()
		.then(function(product){
			res.send(product)
		}, next);
})
