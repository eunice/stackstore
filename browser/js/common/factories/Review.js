app.factory('Review', function ($http){
	return {
		addReview: function (review) {
			return $http.post('/api/user/review', review)
			.then(function (response){
				return response.data;
			})
		}
	}
})