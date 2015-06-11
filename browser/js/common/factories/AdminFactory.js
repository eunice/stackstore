app.factory('AdminFactory', function ($http) {
	return {
		getAllProducts: function() {
			return $http.get('/api/admin/products/')
			.then(function (response) {
				return response.data;
			})
		},
		deleteProduct: function(id){
			return $http.delete('api/admin/' + id)
			.then(function(response) {
				return response.data;
			})
		}
	}
})