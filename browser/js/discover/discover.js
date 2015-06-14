'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('discover', {
        url: '/discover',
        controller: 'DiscoverController',
        templateUrl: 'js/discover/discover.html'
    });

});

app.controller('DiscoverController', function ($scope, $interval) {
    $scope.hero;
    $scope.categories = [
      { label: 'chefs'},
      { label: 'comedians'},
      { label: 'designers'},
      { label: 'entrepreneurs'},
      { label: 'musicians'},
      { label: 'teachers'},
      { label: 'writers'},
      { label: 'actors'},
      { label: 'athletes'}
    ];

    $scope.getHero = function () {
     $scope.hero = $scope.categories[Math.floor(Math.random()*$scope.categories.length)].label;
    }

    $scope.getHero();
    $interval($scope.getHero, 3000);


});
