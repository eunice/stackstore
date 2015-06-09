'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
console.log('testing');

router.get('/getProducts/:category', function (req, res) {
    console.log('hitting route')
    var cat = req.params.category;
    var params = cat ? {category: cat} : {};
    mongoose.model('Product')
    .find(params)
    .exec()
    .then(function(products){
        console.log(products);
        res.status(200).send(products);
    }, function(err) {
        throw 'Error retrieving a category\'s products: ' + err;
    });
});

router.get('/search/:word', function (req, res) {
    console.log('hitting route')
    var word = req.params.word;
    console.log(word);
    mongoose.model('Product')
    .find({title: word})
    .exec()
    .then(function(products){
        console.log(products);
        res.status(200).send(products);
    }, function(err) {
        throw 'Error retrieving a category\'s products: ' + err;
    });
});