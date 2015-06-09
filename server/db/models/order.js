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
	orderDetails: {
		price: {
			type: Number,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		},
		cartId: {
			type: String,
			required: true
		},
	},
	status: {
		type: String,
		required: true
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
})

mongoose.model('Order', schema);