app.controller('ReviewController', function($scope, $modalInstance, $state, id, Review) {
	$scope.error = null;
	$scope.boughtError = false;
	$scope.submitted = false;

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

})