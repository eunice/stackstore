app.config(function ($stateProvider) {

    $stateProvider.state('resetPw', {
        url: '/resetpw',
        templateUrl: 'js/resetpw/resetpw.html',
        controller: 'ResetPwCtrl'
    });

});

app.controller('ResetPwCtrl', function ($scope, UserInfo, Session, AuthService, $state, $window, $location) {

  $scope.error = null;
  $scope.passwordMatch = false;

  $scope.pw = {}

  $scope.resetPw = function (loginInfo) {

      if ($scope.signin.password !== $scope.passwordConfirm) {
        console.log($scope.signin.password)
        console.log($scope.passwordConfirm)
          $scope.passwordMatch = true;
          return;
      }

      // UserInfo.checkSignUp(loginInfo.email).then (function(founduser) {
      //   console.log('founduser', founduser);
      //     if(founduser){
      //         $scope.error = true;
      //
      //     }else{
      //       console.log('signuppppp', loginInfo);
      //         UserInfo.signUpInfo(loginInfo);
      //
      //     }
      // });

      $scope.passwordConfirm = null;

      Session.user.reset = false;

  };

    // $scope.login = {};
    // $scope.error = null;
    //
    // $scope.sendLogin = function (loginInfo) {
    //
    //     $scope.error = null;
    //
    //
    //     AuthService.login(loginInfo).then(function () {
    //         console.log('hello')
    //
    //         $state.go('home');
    //         // $location.href="http://localhost:1337/discover"
    //     }).catch(function () {
    //         $scope.error = 'Invalid login credentials.';
    //     });
    //
    // };
    //
    // $scope.redirectLogin = function(location){
    //   console.log('oauth', location)
    //   $window.location.href = "/auth/" + location;
    //     // $state.go('discover');
    // };

});
