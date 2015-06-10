app.config(function ($stateProvider) {

    $stateProvider.state('categories', {
        url: '/category/:category',
        controller: 'CategoryController',
        templateUrl: 'js/categories/categories.html'
    });

});

app.controller('CategoryController', function ($scope, $stateParams, GetProductsForCategory, LocalStorage) {
	$scope.products;
	GetProductsForCategory.getProducts($stateParams.category)
	.then(function (products) {
		$scope.products = products;
	});
	// $scope.deleted = false;
	$scope.addItem = function (item) {
		return LocalStorage.addItemToCart(item);
		// return localStorageService.set('cart', item);
	};

	// function addToCart (item) {
	// 	return localStorageService.set('cart', item);
	// }
});