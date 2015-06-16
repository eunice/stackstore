app.config(function ($stateProvider) {

    $stateProvider.state('userOnly', {
        url: '/useronly',
        templateUrl: 'js/userOnly/userOnly.html',
        controller: 'UserCtrl'
    });

    $stateProvider.state('userOnly.pastOrders', {
        url: '/pastorders',
        templateUrl: 'js/userOnly/pastOrders.html',
        controller: 'pastOrderCtrl'
    });

});

app.controller('UserCtrl', function ($scope, AuthService, Session) {

  (function isUser () {

    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
        console.log('user contrl auth', $scope.user.userType)
        if ($scope.user.userType === "User") $scope.isUser=true
    });

  })()

});

app.controller('pastOrderCtrl', function ($scope, AuthService, User, Session, $modal) {

  (function isUser () {

    AuthService.getLoggedInUser().then(function (user) {

        console.log('user', user)

        //Make sure only user has access to "view account"
        if (user.userType === "User") $scope.isUser=true

        //populate "View Past Orders"
        User.getAll(user._id).then(function(info) {
          console.log('lalauserinfo',info)
          console.log('lalauserinfoitem',info.orders[0].items)
          $scope.orders = info.orders;
        })


    });

  })()

  // User.getAll("557f1948b2227ddb79ec8eba").then(function(info) {
  //   console.log('userinfo',info)
  // })

  $scope.viewOrder = function (order) {

    console.log('view order', order)

    var modalInstance = $modal.open({
      templateUrl: 'js/userOnly/viewOrder.html',
      controller: 'viewYourOrderModalCtrl',
      resolve: {
        order: function() {
          return order;
        }
      }
    });

  }

});

app.controller('viewYourOrderModalCtrl', function ($scope, User, $modalInstance, order, $state) {

  console.log('order', order.items)

  $scope.order = order;

  // //calculate the subtotal
  (function subtotal () {
    console.log('subtotal items',order)
    var sum = 0;

    order.items.forEach(function(item) {
      sum += item.price * item.quantity
    })

    console.log('sum', sum)

    $scope.subtotal = sum;
  })();


  $scope.close = function () {
    $modalInstance.close();
    // $state.go('userOnly.pastOrders')
  }

})
