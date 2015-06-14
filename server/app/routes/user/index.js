'use strict';
var mongoose = require('mongoose');

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
