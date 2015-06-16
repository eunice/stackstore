'use strict';

app.factory('User', function ($http) {
	return {
		getAll: function (id) {
			return $http.get('/api/user/')
			.then(function (response) {
				console.log(response)
				return response.data;
			})
		},
		makeHero: function () {
			return $http.put('api/user')
			.then(function (response) {
				return response.data;
			})
		}
	}
})
