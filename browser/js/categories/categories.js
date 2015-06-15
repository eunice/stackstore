app.config(function ($stateProvider) {

	$stateProvider.state('categories', {
		url: '/category/:category',
		controller: 'CategoryController',
		templateUrl: 'js/categories/categories.html'
	});

});

app.controller('CategoryController', function ($scope, $stateParams, GetProductsForCategory, LocalStorage, AuthService, Storage, $modal) {
	$scope.products = null;
	GetProductsForCategory.getProducts({'category':$stateParams.category})

	.then(function (products) {
		console.log
		$scope.products = products;
	});
	$scope.addItem = function (item) {
		if (!AuthService.isAuthenticated()) {
			return LocalStorage.addItemToCart(item);
		} else {
			return Storage.addItemToCart(item);
		}
	};

	$scope.open = function (id) {
		console.log('opening')
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'js/categories/modal/modal.html',
			controller: 'ReviewController',
			size: 'lg',
			resolve: {
				id: function () {
					return id
				}
			}
		});
	};

});