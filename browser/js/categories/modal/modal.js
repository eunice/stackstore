app.controller('ReviewController', function($scope, $modalInstance, $state, id, Review) {
	console.log(id)
	$scope.error = null;

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
			console.log(res)
		})
	};

})