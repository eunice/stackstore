app.factory('Review', function ($http){
	return {
		addReview: function (review) {
			return $http.post('/api/user/review', review)
			.then(function (response){
				console.log('hello',response.data)
				return response.data;
			},
			function(err){
				return err;
			})
		},
		getReviews: function(id) {
			return $http.get('/api/products/reviews/' + id)
			.then(function(response) {
				return response.data;
			})
		}
	}
})