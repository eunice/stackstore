app.factory('GetProductsForCategory', function ($http) {
	return {
		getProducts: function (category) {
			return $http.get('/api/categories/getProducts/' + category)
			.then(function (response) {
				return response.data;
			})
		}
	}
})