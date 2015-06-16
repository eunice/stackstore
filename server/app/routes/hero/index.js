'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();
module.exports = router;

router.post('/', function (req, res, next) {
	req.body.hero = req.user._id;
	mongoose.model('Product').create(req.body)
	.then(function(productinfo) {
		res.send(productinfo);
	}, next)
});

router.get('/', function (req, res, next) {
	mongoose.model('Product')
	.find({hero: req.user._id})
	.exec()
	.then(function (products) {
		res.json(products);
	},next)

});

