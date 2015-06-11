'use strict';
app.directive('manageProduct', function ($rootScope, AdminFactory, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/manageProduct/manageProduct.html',
        link: function (scope) {

            AdminFactory.getProducts().then(function(product){
                scope.products = product;
            });
        }
    }
            
});
