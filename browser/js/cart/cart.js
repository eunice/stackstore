app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('CartController', function ($scope, $stateParams, GetProductsForCategory, LocalStorage, AuthService, $state) {
	$scope.productIds = LocalStorage.getCart();
	$scope.idArray = Object.keys($scope.productIds);
	$scope.products = null;
	$scope.cart = null;
	$scope.ordered = false;
	$scope.total = 0;

	$scope.removeItem = function (itemId) {
		LocalStorage.removeItemFromCart(itemId);
	};
	
	GetProductsForCategory.getById($scope.idArray)
	.then(function (products) {
		$scope.products = products;
	});

	$scope.checkout = function () {
		AuthService.getLoggedInUser()
		.then(function (user){
			return LocalStorage.checkoutCart();
		})
		.then (function (cart) {
			console.log(cart);
			$scope.cart = cart;
			$scope.ordered = true;
			sumPrice();
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
});