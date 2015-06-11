'use strict';
app.directive('manageProduct', function ($rootScope, AdminFactory, $state, GetProductsForCategory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/manageProduct/manageProduct.html',
        link: function (scope) {

            // scope.categories = [
            //   { label: 'chefs'},
            //   { label: 'comedians'},
            //   { label: 'designers'},
            //   { label: 'entrepreneurs'},
            //   { label: 'musicians'},
            //   { label: 'teachers'},
            //   { label: 'writers'}
            // ];
            scope.deleteProduct = function(product){
                AdminFactory.deleteProduct(product._id);
            }

            AdminFactory.getAllProducts().then(function(products){
                scope.products = products;
            });



        }
    }
            
});
