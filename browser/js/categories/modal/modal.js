app.controller('ReviewController', function($scope, $modalInstance, $state, id, Review, AuthService) {
	$scope.error = null;
	$scope.boughtError = false;
	$scope.submitted = false;
	$scope.user = AuthService.isAuthenticated();
	console.log($scope.user)

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.close = function() {
		$modalInstance.close();
	}

	$scope.submitReview = function (review) {
		review.productId = id;
		Review.addReview(review)
		.then(function(res){
			if (res.status === 401) $scope.boughtError = true;
			else {
				$scope.boughtError = false;
				$scope.submitted = true;
				// $modalInstance.close();
			};
		})
	};
	console.log()

	$scope.getReviews = function(id) {
		Review.getReviews(id)
		.then(function(product) {
			$scope.reviews = product.reviews;
			console.log(product)
		})
	}

	$scope.getReviews(id);
})