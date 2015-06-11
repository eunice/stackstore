var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	userType: {
		type: String,
		required: true
	},
	items: [{
		price: {
			type: Number,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		},
		productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
	}],
	status: {
		type: String,
		enum: ['PENDING', 'PROCESSED', 'REJECTED', 'CANCELLED', 'FULFILLED'],
		required: true
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Order', schema);