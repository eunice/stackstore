'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();
module.exports = router;

router.get('/findBeforeCreate', function(req, res){

	mongoose.model('User').findOne({email: req.query.email})
		.exec()
		.then(function(user){
			res.send(user);
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
