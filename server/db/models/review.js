var mongoose = require('mongoose');

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
	return review.length > 0 && review.length < 2000;
}

schema.pre('save', function(next, done) {
	var self = this;
	mongoose.model('User').findById(self.userId)
		.populate('orders')
		.exec()
		.then(function(user) {
			var items = user.orders[0].items
				if (!JSON.stringify(items).match(self.productId))
					next(new Error('You cannot review an item you haven\'t bought!'));
				else {
					user.reviews.push(self._id);
					user.save(function(err, user){
						next();
						done();
					})
				}
			});
});

mongoose.model('Review', schema);