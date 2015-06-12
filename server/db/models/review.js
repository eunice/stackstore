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
};

schema.pre('save', function(next, done) {
	var self = this;

	User.findbyId(self.userId)
		.exec()
		.then(function(user) {
				if (user.reviews.indexOf(self._id) === -1)
					next(new Error('You cannot review an item you haven\'t bought!'))
				else next();
			},
			function(reason) {
				next(new Error(reason));
			});
});
