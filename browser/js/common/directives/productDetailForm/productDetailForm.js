'use strict';
app.directive('productDetailForm', function ($rootScope, AdminFactory, $state, GetProductsForCategory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/manageProduct/manageProduct.html',
        link: function (scope) {

          scope.product = {
            title: null,
            descripion: null,
            price: null,
            quantity: null,
            category: null,
            img: null
          }


        }
    }

});
