app.factory('GetProductsForCategory', function ($http) {
	return {
		getProducts: function (category) {
			console.log('Factory category: ',category);
			return $http.get('/getProducts/' + category)
			.then(function (response) {
				console.log(response)
				return response.data;
			})
		}
	}
})