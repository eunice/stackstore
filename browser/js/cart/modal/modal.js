app.controller('GuestController', function($scope, $modalInstance, LocalStorage, $state) {

	$scope.error = null;
	$scope.ordered = false;
	$scope.order;
	$scope.total = 0;
	$scope.name;
	$scope.submitOrder = function (guestInfo) {
		$scope.name = guestInfo.displayName;
		LocalStorage.checkoutCart(guestInfo)
		.then(function (order) {
			$scope.ordered = true;
			$scope.order = order;
			sumPrice();
		})
	};


	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	function sumPrice () {
		$scope.order.items.forEach(function (item) {
			$scope.total += item.price * item.quantity;
		})
	}

	$scope.close = function() {
		$modalInstance.close();
		$state.go('discover');
	}


})