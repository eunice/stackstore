'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('becomehero', {
        url: '/becomehero',
        templateUrl: 'js/becomehero/becomehero.html',
        controller: 'BecomeHeroCtrl',
    });

});


app.controller('BecomeHeroCtrl', function ($scope, User, $modal, Hero) {
    $scope.user;
    $scope.isHero;
    $scope.products;
    $scope.categories = [{label: 'comedians'},{label: 'chefs'},{label: 'writers'},{label: 'teachers'},{label: 'musicians'},{label: 'entrepreneurs'},{label: 'designers'},{label: 'actors'},{label: 'athletes'}]

    Hero.getProducts()
    .then(function (products){
        $scope.products = products;
    })

    User.getAll()
    .then(function (response){
        $scope.user = response;
        $scope.isHero = response.userType === 'Hero'
    })

    $scope.heroify = function () {
        User.makeHero()
        .then(function (response){
            return response;
        })
    }

    $scope.createProduct = function() {
        var modalInstance = $modal.open({
            templateUrl: 'js/admin/template/createProducts.html',
            controller: 'HeroController',
            resolve: {
                categories: function() {
                    return $scope.categories;
                }
            }
        });
    }

    
});
