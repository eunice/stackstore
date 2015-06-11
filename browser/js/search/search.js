'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('search', {
		url: '/search/:params',
		controller: 'SearchController',
		templateUrl: 'js/search/search.html'
	});
});

app.controller('SearchController', function($scope, $stateParams, SearchFactory) {

    SearchFactory.search($stateParams.params).then(function(results) {
        console.log(results);
       $scope.results = results;
    });
    

});