'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('store', {
		url: '/store/:id',
		controller: 'ProfileController',
		templateUrl: 'js/store/store.html'
	});
});

app.controller('ProfileController', function ($scope, $stateParams, User, GetProductsForCategory, Hero) {
	$scope.user = null;
	$scope.image;
	$scope.products;
	$scope.getUser = function (id) {
		User.getAll($stateParams.id)
		.then(function (user) {
			console.log(user)
			$scope.user = user;
			if (user.facebook)
				$scope.image = "http://graph.facebook.com/" + user.facebook.id + "/picture?type=large";
		})
	};
	GetProductsForCategory.getById
	$scope.getUser();
	Hero.getProducts()
	.then(function (products) {
		$scope.products = products;
		console.log('products', $scope.products)
	})
});