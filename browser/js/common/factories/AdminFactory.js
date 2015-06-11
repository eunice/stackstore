app.factory('AdminFactory', function ($http) {
	return {
		getAllProducts: function () {
			console.log('hit factory admin product')
			return $http.get('/api/admin/products/')
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