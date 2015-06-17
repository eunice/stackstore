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
	$scope.user;

	function getTotal() {
		$scope.products.forEach(function(product) {
			var id = product._id
			if ($scope.productIds[id]) {
				$scope.total += product.price * $scope.productIds[id]
			}
		})
	}

	$scope.getProductIds = function () {
		AuthService.getLoggedInUser().then(function(user) {
			$scope.user = user;

			if ($scope.user) {
				return Storage.getCart()
					.then(function(itemIds) {
						$scope.productIds = itemIds;
						$scope.idArray = Object.keys($scope.productIds);
						getItems();
						
					})
			} else {
				$scope.productIds = LocalStorage.getCart();
				$scope.idArray = $scope.productIds ? Object.keys($scope.productIds) : null;
				getItems();
			}
		});
	}

	$scope.getProductIds();

	$scope.removeItem = function (itemId) {
		$scope.products.forEach(function(product, ix){
			if (product._id === itemId) 
				$scope.products.splice(ix, 1);
		})
		if (AuthService.isAuthenticated())
			return Storage.removeItemFromCart(itemId)

		else
			return LocalStorage.removeItemFromCart(itemId);
	};
	
	function getItems () {
		return GetProductsForCategory.getById($scope.idArray)
		.then(function (products) {
			$scope.products = products;
			console.log($scope.productIds)
			getTotal();
		});
	}

	$scope.checkout = function () {
		AuthService.getLoggedInUser()
		.then(function (user){
			if (!user) return $scope.open();

			// else Storage.checkoutCart()
			// 	.then (function (cart) {
			// 		console.log('hello',cart);
			// 		$scope.cart = cart;
			// 		$scope.ordered = true;
			// 		sumPrice();
			// 	})
			else return $scope.openUser();
		})
		
	};

	$scope.editCart = function() {
		console.log('edit')
		$scope.openEdit();

	}

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

	$scope.openUser = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'js/cart/cart.html',
			controller: 'UserCheckoutController',
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

	$scope.openEdit = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'js/cart/editCart/editCart.html',
			controller: 'EditCartController',
			size: 'lg',
			resolve: {
				products: function () {
					return $scope.products;
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