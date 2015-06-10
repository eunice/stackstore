'use strict';
var mongoose = require('mongoose');

var router = require('express').Router();
module.exports = router;

router.get('/findBeforeCreate', function(req, res){
	console.log('req.query'+req.query)
	mongoose.model('User').findOne(req.query)
	.then(function (user) {
            if (err) return done(err);
            // user.correctPassword is a method from our UserModel schema.
            if (user) return done(err);
            // Properly authenticated.
            else return done(null, user);
        });
})

router.post('/', function (req, res) {
	console.log('hit req.body'+req.body)
    mongoose.model('User').create(req.body)
            .then(function(signupinfo) {
                res.send(signupinfo);
            }, function(err){
            	res.status(500).end();
            })
});