'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('Profile', {
		url: '/profile/:id',
		controller: 'ProfileController',
		templateUrl: 'js/profile/profile.html'
	});
});

app.controller('ProfileController', function ($scope, $stateParams, User, GetProductsForCategory) {
	$scope.user = null;
	$scope.image;
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
});