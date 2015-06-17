app.factory('GetProductsForCategory', function ($http) {
	return {
		getProducts: function (category) {
			return $http.get('/api/products', {params: category})
			.then(function (response) {
				return response.data;
			});
		},
		getAll: function() {
			return $http.get('/api/products')
			.then(function (response) {
				return response.data;
			})
		},
		getById: function (ids) {
			return $http.get('/api/products/',
				{params: ids})
			.then(function (response) {
				return response.data;
			});
		}
	};
});
