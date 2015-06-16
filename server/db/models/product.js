'use strict';
var deepPopulate = require('mongoose-deep-populate');
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
        default: 'http://blogs-images.forbes.com/briansolomon/files/2014/05/elon-musk-portrait-e1399572239766.jpg'
    },
    hero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

schema.plugin(deepPopulate, {
  populate: {
    'reviews.userId': {
      select: 'displayName email photo'
    }
  }
})


mongoose.model('Product', schema);