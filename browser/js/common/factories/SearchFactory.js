app.factory('SearchFactory', function($http) {
	return {
		search: function(word) {
			return $http.get('/api/products/search/' + word)
			.then(function(response) {
				return response.data;
			});
		}
	};
});
