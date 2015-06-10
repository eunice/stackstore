app.config(function ($stateProvider) {

    $stateProvider.state('categories', {
        url: '/category/:category',
        controller: 'CategoryController',
        templateUrl: 'js/categories/categories.html'
    });

});

app.controller('CategoryController', function ($scope, $stateParams, GetProductsForCategory) {
	$scope.products;
	GetProductsForCategory.getProducts($stateParams.category)
	.then(function (products) {
		// console.log('products', products);
		$scope.products = products;
	});
});