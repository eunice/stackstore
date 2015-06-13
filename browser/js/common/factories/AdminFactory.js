app.factory('AdminFactory', function ($http) {
	return {

		//Product
		getProducts: function(category) {
			console.log('get product factory', category)

			var queryParams= {};

			if (category) {
				queryParams.category = category;
			}

			return $http.get('/api/admin/products', {params: queryParams})
			.then(function (response) {
				return response.data;
			})
		},

		deleteProduct: function(id){
			return $http.delete('api/admin/products/' + id)
			.then(function(response) {
				return response.data;
			})
		},

		createProduct: function(product){
			return $http.post('api/admin/products/', product)
			.then(function (response) {
				return response.data;
			})
		},

		editProduct: function(id, updateInfo){
			return $http.put('api/admin/products' + id, updateInfo)
			.then(function (response) {
				return response.data;
			})
		},

		//User
		getUsers: function(category) {
			console.log('get product factory', category)

			var queryParams= {};

			if (category) {
				queryParams.category = category;
			}

			return $http.get('/api/admin/products', {params: queryParams})
			.then(function (response) {
				return response.data;
			})
		}

	}
})
