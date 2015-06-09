'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('discover', {
        url: '/discover',
        controller: 'DiscoverController',
        templateUrl: 'js/discover/discover.html'
    });

});

app.controller('DiscoverController', function ($scope) {

    // Add state for the categories later!!!!!!!!!!!!!!!!!
    $scope.categories = [
      { label: 'Chefs', state: ''},
      { label: 'Comedians', state: ''},
      { label: 'Designers', state: ''},
      { label: 'Entrepreneurs', state: ''},
      { label: 'Musicians', state:''},
      { label: 'Teachers', state:''},
      { label: 'Writers', state:''}
    ]

});
