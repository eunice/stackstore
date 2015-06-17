'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('search', {
		url: '/search/:params',
		controller: 'SearchController',
		templateUrl: 'js/search/search.html'
	});
});

app.controller('SearchController', function ($scope, $stateParams, SearchFactory, GetProductsForCategory) {
	
    // GetProductsForCategory.getAll()
    // .then(function(results){
    // 	$scope.results = results;
    // })


    SearchFactory.search($stateParams.params).then(function(results) {
        console.log(results);
       $scope.results = results;
    });
    

});