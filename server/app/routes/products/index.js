'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.get('/?', function (req, res, next) {
    var query;
    var arr = [];
    if (req.query.category) query = req.query;
    else {
        for (var key in req.query) {
            arr.push(req.query[key]);
        };
        query = {'_id': { $in: arr}}
    }
    mongoose.model('Product')
    .find(query)
    .exec()
    .then(function(products){
        res.status(200).send(products);
    },next)

});

router.get('/search/:word', function (req, res, next) {
    var wordRegExp = new RegExp(req.params.word, "i");
    mongoose.model('Product')
    .find({title: wordRegExp})
    .exec()
    .then(function(products){
        res.status(200).send(products);
    },next);
});

router.get('/reviews/:id', function(req, res, next) {
    console.log('route')
    mongoose.model('Product')
    .findById(req.params.id)
    .populate('reviews')
    .exec()
    .then(function(product) {
        res.status(200).send(product);
    }, next)
})
