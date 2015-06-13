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
		checkoutCart: function (user) {
			return $http.post('/api/cart', locker.get('cart'))
			.then(function (response) {
				return response.data;
			})
		}
	};
});