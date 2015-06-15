'use strict';

app.factory('User', function ($http) {
	return {
		getAll: function (id) {
			return $http.get('/api/user/'+id)
			.then(function (response) {
				console.log(response)
				return response.data;
			})
		}
	}
})
