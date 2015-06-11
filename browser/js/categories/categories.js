app.config(function ($stateProvider) {

    $stateProvider.state('categories', {
        url: '/category/:category',
        controller: 'CategoryController',
        templateUrl: 'js/categories/categories.html'
    });

});

app.controller('CategoryController', function ($scope, $stateParams, GetProductsForCategory, LocalStorage) {
	$scope.products;

	GetProductsForCategory.getProducts({'category':$stateParams.category})
	.then(function (products) {
		console.log
		$scope.products = products;
	});
	$scope.addItem = function (item) {
		return LocalStorage.addItemToCart(item);
	};

});