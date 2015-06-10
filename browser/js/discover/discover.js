'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('discover', {
        url: '/discover',
        controller: 'DiscoverController',
        templateUrl: 'js/discover/discover.html'
    });

});

app.controller('DiscoverController', function ($scope) {

    $scope.categories = [
      { label: 'chefs'},
      { label: 'comedians'},
      { label: 'designers'},
      { label: 'entrepreneurs'},
      { label: 'musicians'},
      { label: 'teachers'},
      { label: 'writers'}
    ];

});
