'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();
module.exports = router;

router.get('/products', function(req, res){
	console.log('hit router /products')
	mongoose.model('Product').find({})
		.exec()
		.then(function(products){
			res.send(products);
		}, function(err) {
			res.status(500).send(err.message);
		});
});

router.post('/', function (req, res) {
    mongoose.model('User').create(req.body)
		.then(function(signupinfo) {
          res.send(signupinfo);
      }, function(err){
				console.log(err)
				res.status(500).send(err.message);
      });
});
