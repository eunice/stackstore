'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.post('/', function (req, res, next) {
    var items = req.body.cart;
    var guestInfo = req.body.guest;
    var cart = {
        items: [],
        userId: req.user ? req.user._id : null,
        guest: !req.user,
        status: 'PENDING'
    };
    if (guestInfo) {
        cart.shippingAddress = guestInfo.shippingAddress;
        cart.email = guestInfo.email;
        cart.creditCard = guestInfo.creditCard;
    }

    mongoose.model('Product').find({
        '_id': { $in: Object.keys(items)}
    })
    .exec()
    .then(function (products) {
        products.forEach(function (product) {
            cart.items.push({
                price: product.price,
                productId: product._id,
                quantity: items[product._id]
            })
        })
    })
    .then (function () {
        return mongoose.model('Order').create(cart)
    })
    .then(function (cart) {
        if (cart.userId) {
            mongoose.model('User').findById(cart.userId)
            .exec()
            .then(function (user){
                user.orders.push(cart._id)
                user.save(function (err, user){
                    res.status(200).send(cart)
                });
            })
        } else {
            res.status(200).send(cart)
        }
    })

});
