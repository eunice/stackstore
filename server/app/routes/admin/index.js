'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();
module.exports = router;

router.get('/products', function(req, res){
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
// function isAdmin (req, res, next) {
// 	console.log(session);
// 	next(); 
// }
router.delete('/:id', function (req, res, next) {
	var id = req.params.id;
	mongoose.model('Product').findOneAndRemove({_id: id})
	.exec()
	.then(function(product){
		res.send(product)
	}, next)

});

