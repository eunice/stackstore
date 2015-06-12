app.factory('AdminFactory', function ($http) {
	return {
		getProducts: function(productid) {
			// console.log('get product factory', productid)
			var queryParams= {};

			if (productid) {
				queryParams.productid = productid;
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
		}
	}
})
