app.factory('LocalStorage', function (locker, $http) {
	return {
		addItemToCart: function (item) {
			var cart = locker.get('cart');
			cart = cart || {};
			cart[item] = cart[item] ? ++cart[item] : 1;
			return locker.put('cart', cart);
		},
		removeItemFromCart: function (item) {
			var cart = locker.get('cart');
			delete cart[item];
			locker.put('cart', cart);
		},
		getCart: function () {
			return locker.get('cart');
		},
		checkoutCart: function (guest) {
			var params = {cart: locker.get('cart')};
			if (guest) {
				params.guest = guest;
			}
			return $http.post('/api/cart', params)
			.then(function (response) {
				locker.forget('cart');
				return response.data;
			})
		}

	};
});