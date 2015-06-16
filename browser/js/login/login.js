app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, Session, $state, $window, $location) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;


        AuthService.login(loginInfo).then(function () {
            console.log('hello', Session.user)

            if (Session.user.reset === true) $state.go('resetPw')

            else $state.go('home');
            // $location.href="http://localhost:1337/discover"
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.redirectLogin = function(location){
      console.log('oauth', location)
      $window.location.href = "/auth/" + location;
        // $state.go('discover');
    };

});
