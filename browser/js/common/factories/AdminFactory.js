app.factory('AdminFactory', function ($http) {
	return {

		//Product-----------------------------------------------
		getProducts: function(category) {
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
			return $http.put('api/admin/products/' + id, updateInfo)
			.then(function (response) {
				return response.data;
			})
		},

		//User--------------------------------------------------
		getUsers: function(userType) {
			console.log('get user factory', userType)

			var queryParams= {};

			if (userType) {
				queryParams.userType = userType;
			}

			return $http.get('/api/admin/users', {params: queryParams})
			.then(function (response) {
				return response.data;
			})
		},

		deleteUser: function(id){
			return $http.delete('api/admin/users/' + id)
			.then(function(response) {
				return response.data;
			})
		},

		updateUserType: function(id, type) {
			console.log('update user type', id + type)
			return $http.put('api/admin/users/' + id, {params: type})
			.then(function (response) {
				return response.data;
			})
		},

		pwReset: function(id) {
			console.log('pw reset factory', id)
			return $http.put('api/admin/users/updatepw/' + id, {params: true})
			.then(function(response) {
				return response.data;
			})
		},

		//Orders------------------------------------------------------
		getOrders: function(status) {
			console.log('get order factory', status)

			var queryParams= {};

			if (status) {
				queryParams.status = status;
			}

			return $http.get('/api/admin/orders', {params: queryParams})
			.then(function (response) {
				return response.data;
			})
		},

		getOrderById: function(id) {
			console.log('get order by id factory', id)

			return $http.get('/api/admin/orders/' + id)
			.then(function(response) {
				return response.data;
			})
		},

		updateOrderStatus: function(id, status) {
			console.log('update order status', id+ status)
			return $http.put('api/admin/orders/' + id, {params: status})
			.then(function (response) {
				return response.data;
			})
		}

	}
})
