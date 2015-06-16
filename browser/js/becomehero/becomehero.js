'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('becomehero', {
        url: '/becomehero',
        templateUrl: 'js/becomehero/becomehero.html',
        controller: 'BecomeHeroCtrl',
    });

});


app.controller('BecomeHeroCtrl', function ($scope, User) {

    $scope.heroify = function () {
        User.makeHero()
        .then(function (response){
            console.log(response);
            return response;
        })
    }

});
