app.config(function ($stateProvider) {

    $stateProvider.state('adminOnly', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl'
    });

    //Product Control
    $stateProvider.state('adminOnly.products', {
        url: '/products/:id',
        templateUrl: 'js/admin/template/manageProducts.html',
        controller: 'ManageProductsCtrl',
        // resolve: {
        //   randomValue: function() {
        //     var rand = Math.random();
        //     console.log('resolve: ' + rand);
        //     return rand;
        // }
    });

    $stateProvider.state('adminOnly.products.create', {
        url: '/:id',
        templateUrl: 'js/admin/template/createProducts.html',
        controller: 'ManageProductsCtrl'
    });

    $stateProvider.state('adminOnly.products.edit', {
        url: '/:id',
        templateUrl: 'js/admin/template/editProducts.html',
        controller: 'EditCtrl'
    });


    $stateProvider.state('adminOnly.orders', {
        url: '/orders',
        templateUrl: 'js/admin/template/manageOrders.html',
        controller: 'ManageOrdersCtrl'
    });

    //User Control
    $stateProvider.state('adminOnly.users', {
        url: '/users',
        templateUrl: 'js/admin/template/manageUsers.html',
        controller: 'ManageUsersCtrl'
    });

});
