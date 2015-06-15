var mongoose = require('mongoose');
var q = require('q');
var schema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	stars: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	review: {
		type: String,
		required: true,
		validate: [reviewValidator, 'Review too long.']
	}
});

function reviewValidator(review) {
	return review ? review.length > 0 && review.length < 2000 : false;
}

schema.pre('save', function(next) {
	var self = this;
	mongoose.model('User').findById(self.userId)
		.populate('orders')
		.exec()
		.then(function(user) {
			var items = [];
			user.orders.forEach(function(order) {
				order.items.forEach(function(item) {
					items.push(item.productId);
				})
			})
			if (!~JSON.stringify(items).search(self.productId))
				throw new Error('You cannot review an item you haven\'t bought!');
			else {
				return true
			}
		})
		.then(function() {
			next();
		}, next);
});

mongoose.model('Review', schema);