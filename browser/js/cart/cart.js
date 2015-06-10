app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, $stateParams, GetProductsForCategory, LocalStorage) {
	$scope.productIds = LocalStorage.getCart();
	$scope.idArray = Object.keys($scope.productIds);
	$scope.products;

	$scope.removeItem = function (itemId) {
		LocalStorage.removeItemFromCart(itemId);
	};
	
	GetProductsForCategory.getById($scope.idArray)
	.then(function (products) {
		$scope.products = products;
	});

});