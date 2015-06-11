app.factory('AdminFactory', function ($http) {
	return {
		getProducts: function (category) {
			console.log('hit factory')
			return $http.get('/api/categories/getProducts/' + category)
			.then(function (response) {
				return response.data;
			})
		},
		getById: function (ids) {
			return $http.get('/api/categories/id/',
				{params: {id: ids}
			})
			.then(function (response) {
				return response.data;
			})
		}
	}
})