app.factory('Hero', function($http) {
	return {

		getProducts: function() {
			return $http.get('api/hero')
				.then(function (response) {
					return response.data;
				})
		},

		createProduct: function(product) {
			return $http.post('api/hero/', product)
				.then(function (response) {
					return response.data;
				})
		},

		editProduct: function(id, updateInfo) {
			return $http.put('api/hero/' + id, updateInfo)
				.then(function (response) {
					return response.data;
				})
		},

		deleteProduct: function(id) {
			return $http.delete('api/hero/' + id)
				.then(function (response) {
					return response.data;
				})
		},
		getOrders: function (ids) {
			return $http.get('api/hero/' + ids)
			.then(function (response) {
				return response.data;
			})
		}

	}
})