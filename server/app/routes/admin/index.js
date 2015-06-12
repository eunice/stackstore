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

router.get('/products/', function(req, res){
	console.log('getproduct route', req.query)
	// var id = req.params.id ? {_id: req.params.id} : {};
	var params = req.query.productid ? {_id: req.query.productid } : {};

	mongoose.model('Product').find(params)
		.exec()
		.then(function(products){
			res.send(products);
		}, function(err) {
			res.status(500).send(err.message);
		});
});

router.delete('/products/:id', function (req, res, next) {
	var id = req.params.id;
	console.log('delete',id)
	mongoose.model('Product').findOneAndRemove({_id: id})
	.exec()
	.then(function(product){
		res.send(product)
	}, next)

});

router.post('/products', function (req, res) {
	// console.log('hit create product route', req.body)
    mongoose.model('Product').create(req.body)
		.then(function(productinfo) {
          res.send(productinfo);
      }, function(err){
				console.log(err)
				res.status(500).send(err.message);
      });
});
