'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.get('/api/getProducts/:category', function (req, res) {
    console.log('hitting route')
    var cat = req.params.category;
    mongoose.model('Product')
    .find({category: cat})
    .exec()
    .then(function(products){
        res.status(200).send(products);
    })
    .catch(function (err) {
        throw 'Error retrieving a category\'s products: ' + err;
    })

});