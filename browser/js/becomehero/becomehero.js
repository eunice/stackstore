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
    $scope.orders;
    $scope.showProducts = true;
    $scope.showOrders = true;
    $scope.categories = [{label: 'comedians'},{label: 'chefs'},{label: 'writers'},{label: 'teachers'},{label: 'musicians'},{label: 'entrepreneurs'},{label: 'designers'},{label: 'actors'},{label: 'athletes'}]

    Hero.getProducts()
        .then(function(products) {
            $scope.products = products;
             getOrders();
        })

    User.getAll()
        .then(function(response) {
            $scope.user = response;
            $scope.isHero = response.userType === 'Hero' || 'Admin';
        })

    $scope.heroify = function() {
        User.makeHero()
            .then(function(response) {
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
                },
                product: null
            }
        });
    }

    $scope.editProduct = function(product) {
        var modalInstance = $modal.open({
            templateUrl: 'js/admin/template/editProducts.html',
            controller: 'HeroController',
            resolve: {
                product: function() {
                    return product;
                },
                categories: function() {
                    return $scope.categories;
                }
            }
        });
    }

    $scope.deleteProduct = function(productToDelete) {
        var modalInstance = $modal.open({
            templateUrl: 'js/admin/template/deleteProducts.html',
            controller: 'HeroController',
            resolve: {
                product: function() {
                    return productToDelete;
                },
                categories: function() {
                    return $scope.categories;
                }
            }
        });
    }

    $scope.toggleProducts = function () {
        $scope.showProducts = !$scope.showProducts;
    }

    $scope.toggleOrders = function () {
        $scope.showOrders = !$scope.showOrders;
    }

    function getOrders () {
        var ids = [];
        for (var key in $scope.products) {
            ids.push($scope.products[key]._id);
        }
        Hero.getOrders(ids)
        .then(function (response) {
            $scope.orders = response;
            console.log($scope.orders);
        })
    }

});
