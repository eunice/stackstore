app.factory('Storage', function (locker, $http) {
	return {
		addItemToCart: function (item) {
			return $http.post('/api/user', {item: item})
			.then(function(response) {
				return response.data;
			})
		},
		removeItemFromCart: function (item) {
			return $http.delete('/api/user/' + item)
			.then(function(response) {
				return response.data;
			})
		},
		getCart: function () {
			return $http.get('/api/user')
			.then(function(response) {
				var obj = {};
				response.data.cart.map(function(id){
					obj[id] = obj[id] ? ++obj[id] : 1;
				})
				return obj;
			})
		},
		checkoutCart: function () {
			var self = this;
			return this.getCart()
			.then(function (cart){
				return $http.post('/api/cart', {cart: cart})
				.then(function (response) {
					self.removeAll();
					return response.data;
				})
			})
		},
		removeAll: function() {
			return $http.delete('/api/user/')
			.then(function(response) {
				return response.data;
			})
		}

	};
});