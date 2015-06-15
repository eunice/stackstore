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
		}
	}
})