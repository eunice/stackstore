app.config(function ($stateProvider) {

    $stateProvider.state('categories', {
        url: '/category/:category',
        controller: 'CategoryController',
        templateUrl: 'js/categories/categories.html'
    });

});

app.controller('CategoryController', function ($scope, $stateParams, GetProductsForCategory, LocalStorage, AuthService, Storage) {
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

});