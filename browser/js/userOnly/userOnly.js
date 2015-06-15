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

app.controller('pastOrderCtrl', function ($scope, AuthService, User, Session) {

  (function isUser () {

    AuthService.getLoggedInUser().then(function (user) {

        console.log('user', user)

        //Make sure only user has access to "view account"
        if (user.userType === "User") $scope.isUser=true

        //calculate the subtotal
        function subtotal (items) {
          console.log('subtotal items',orders)
          var sum = 0;

          items.forEach(function(item) {
            sum += item.price * item.quantity
          })

          return sum;
        }

        //populate "View Past Orders"
        User.getAll(user._id).then(function(info) {
          console.log('lalauserinfo',info.orders[0].items)
          $scope.orders = info.orders;
        })



    });


  })()

  User.getAll("557f1948b2227ddb79ec8eba").then(function(info) {
    console.log('userinfo',info)
  })






});
