'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/signup', require('./signup'));
router.use('/members', require('./members'));
// router.use('/tutorial', require('./tutorial'));
// router.use('/members', require('./members'));

// router.use('/categories', require('./categories'));
router.use('/admin', require('./admin'));
router.use('/products', require('./products'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
