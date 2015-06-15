'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/signup', require('./signup'));
router.use('/members', require('./members'));
router.use('/admin', require('./admin'));
router.use('/products', require('./products'));
router.use('/user', require('./user'));
router.use('/cart', require('./cart'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
