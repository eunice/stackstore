app.controller('ReviewController', function($scope, $modalInstance, $state, id, Review, AuthService) {
	$scope.error = null;
	$scope.boughtError = false;
	$scope.submitted = false;
	$scope.user = AuthService.isAuthenticated();

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
			};
		})
	};

	$scope.getReviews = function(id) {
		Review.getReviews(id)
		.then(function(product) {
			console.log(product);
			$scope.reviews = product.reviews;
		})
	}

	$scope.toProfile = function(id) {
		$modalInstance.close();
		$state.go('Profile', {id: id})
	}

	$scope.getReviews(id);
})