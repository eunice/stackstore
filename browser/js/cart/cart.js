app.config(function ($stateProvider) {

	$stateProvider.state('cart', {
		url: '/cart',
		controller: 'CartController',
		templateUrl: 'js/cart/cart.html'
	});

});

app.controller('CartController', function ($scope, $stateParams, GetProductsForCategory, LocalStorage, Storage, AuthService, $state, $modal) {
	$scope.productIds = null;
	$scope.products = null;
	$scope.cart = null;
	$scope.ordered = false;
	$scope.total = 0;

	$scope.getProductIds = function () {
		//refreshing page doesn't work atm
		console.log(AuthService.isAuthenticated());
		if (AuthService.isAuthenticated()) {
			return Storage.getCart()
			.then(function(itemIds){
				console.log('hi',itemIds)
				$scope.productIds = itemIds;
				$scope.idArray = Object.keys($scope.productIds);
				console.log('auth id array',$scope.idArray)
				getItems();
			})
		} else {
			$scope.productIds = LocalStorage.getCart();
			$scope.idArray = Object.keys($scope.productIds);
			getItems();
		}
	}

	$scope.getProductIds();

	$scope.removeItem = function (itemId) {
		if (AuthService.isAuthenticated())
			return Storage.removeItemFromCart(itemId)
		.then(function() {
			$scope.products.splice($scope.products.indexOf(itemId),1);

		})
		else
			return LocalStorage.removeItemFromCart(itemId);
	};
	
	function getItems () {
		return GetProductsForCategory.getById($scope.idArray)
		.then(function (products) {
			$scope.products = products;
		});
	}

	$scope.checkout = function () {
		AuthService.getLoggedInUser()
		.then(function (user){
			if (!user) return $scope.open();

			else Storage.checkoutCart()
				.then (function (cart) {
					console.log('hello',cart);
					$scope.cart = cart;
					$scope.ordered = true;
					sumPrice();
				})
		})
		
	};

	function sumPrice () {
		$scope.cart.items.forEach(function (item) {
			$scope.total += item.price * item.quantity;
			$scope.products.forEach(function (product) {
				if (product._id === item.productId) 
					product.userQuantity = item.quantity;
			})
		})
	}

	$scope.animationsEnabled = true;

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'js/cart/modal/modal.html',
			controller: 'GuestController',
			size: 'lg',
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
	};

});