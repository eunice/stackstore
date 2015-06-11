var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userId: {
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
	return review.length > 0 && review.length < 2000;
}

schema.pre('save', function(next, done) {
	var self = this;

	mongoose.model('User').findbyId(self.userId)
		.populate('orders')
		.exec()
		.then(function(user) {
				if (user.orders.indexOf(self._id) === -1)
					next(new Error('You cannot review an item you haven\'t bought!'));
				else {
					user.reviews.push(self._id);
					next();
				}
			},
			next);
});

mongoose.model('Review', schema);