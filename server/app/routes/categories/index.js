'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
console.log('testing');

router.get('/getProducts/:category', function (req, res) {
    var cat = req.params.category;
    var params = cat ? {category: cat} : {};
    mongoose.model('Product')
    .find(params)
    .exec()
    .then(function(products){
    console.log('hitting route product', products)
        res.status(200).send(products);
    }, function(err) {
        throw 'Error retrieving a category\'s products: ' + err;
    });
});

router.get('/id/', function (req, res) {
    var idArray = req.query.id;
    mongoose.model('Product')
    .find({
    '_id': { $in: idArray} 
    })
    .exec()
    .then(function(products){
        res.status(200).send(products);
    }, function(err) {
        throw 'Error retrieving your cart: ' + err;
    });
});

router.get('/search/:word', function (req, res) {
    var wordRegExp = new RegExp(req.params.word, "i");
    mongoose.model('Product')
    .find({title: wordRegExp})
    .exec()
    .then(function(products){
        res.status(200).send(products);
    }, function(err) {
        throw 'Error retrieving a category\'s products: ' + err;
    });
});
