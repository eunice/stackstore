app.config(function ($stateProvider) {

    $stateProvider.state('adminOnly', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl'
    });

    //Product Control
    $stateProvider.state('adminOnly.products', {
        url: '/products',
        templateUrl: 'js/admin/template/manageProducts.html',
        controller: 'ManageProductsCtrl'
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
