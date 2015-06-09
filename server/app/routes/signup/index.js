'use strict';
var mongoose = require('mongoose')
// var VIDEOS = require('./videos.json');

var router = require('express').Router();
module.exports = router;

router.post('/signup', function (req, res, next) {
	var email = req.body.email;
	var pw = req.body.password;
    mongoose.model('User').create({
    	email:email, 
    	password: pw
    }, function (err, signup) {
    	if (err) next (err);
    	res.send(signup);
    });
});