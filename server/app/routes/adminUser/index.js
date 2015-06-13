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
