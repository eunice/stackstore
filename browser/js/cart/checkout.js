app.controller('UserCheckoutController', function($scope, $modalInstance, Storage, $state) {

	$scope.error = null;
	$scope.ordered = false;
	$scope.order;
	$scope.total = 0;
	$scope.name;
	$scope.user = true;

	$scope.submitOrder = function() {
		//$scope.name = guestInfo.displayName;

		Storage.checkoutCart()
			.then(function(order) {
				console.log('hello', order);
				$scope.order = order;
				$scope.ordered = true;
				sumPrice();
				console.log($scope.order)
			})
	};
	$scope.submitOrder();

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	function sumPrice() {
		$scope.order.items.forEach(function(item) {
			$scope.total += item.price * item.quantity;
		})
	}

	$scope.close = function() {
		$modalInstance.close();
		$state.go('discover');
	}


})