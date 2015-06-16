'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();
module.exports = router;

//Check if user is admin, if yes, proceed to other routes
router.use(function (req, res, next) {
	// console.log('req.user',req.user)
	if (req.user && (req.user.userType === "Admin")) next();
	else res.status(401).send('No authenticated admin');
});

router.get('/', function(req, res, next){
	console.log('getuser route', req.query)
	// var id = req.params.id ? {_id: req.params.id} : {};
	var params = req.query.userType ? {userType: req.query.userType } : {};

	// params = {category: "comedian" }

	mongoose.model('User').find(params)
		.exec()
		.then(function(users){
			res.send(users);
		}, next);
});

router.delete('/:id', function (req, res, next) {
	var id = req.params.id;
	console.log('delete user',id)
	mongoose.model('User').findOneAndRemove({_id: id})
	.exec()
	.then(function(user){
		res.send(user)
	}, next)

});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('edit user type route', req.body.params + req.params.id)

	mongoose.model('User').findOneAndUpdate({_id: id}, {userType: req.body.params})
		.exec()
		.then(function(user){
			res.send(user)
		}, next);
})


router.put('/updatepw/:id', function (req, res, next) {
		console.log('hit pw reset', req.body.params)
		var id = req.params.id;

    mongoose.model('User').findOneAndUpdate({_id: id}, {reset: req.body.params})
		.exec()
		.then(function(user) {
          res.send(user);
      }, next);
});
