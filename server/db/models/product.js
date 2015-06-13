'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: Infinity
    },
    category: {
        type: String,
        required: true,
        enum: ['comedians', 'chefs', 'writers', 'teachers', 'musicians', 'entrepreneurs', 'designers', 'actors', 'athletes']
    },
    img: {
        type: String,
        default: '/images/elon.png'
    },
    hero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});


mongoose.model('Product', schema);