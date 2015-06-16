app.config(function ($stateProvider) {

    $stateProvider.state('resetPw', {
        url: '/resetpw',
        templateUrl: 'js/resetpw/resetpw.html',
        controller: 'ResetPwCtrl'
    });

});

app.controller('ResetPwCtrl', function ($scope, Session, UserInfo, $state) {

  $scope.error = null;
  $scope.incorrectOldPw = false;
  $scope.passwordMatch = false;

  $scope.newpw = {password: null}

  // if (!correctPassword($scope.oldpw)) $scope.incorrectOldPw = true

  $scope.resetPw = function (pwInfo) {

      if ($scope.newpw.password !== $scope.passwordConfirm) {
        console.log('newpw',$scope.newpw)
        console.log('pwconfirm',$scope.passwordConfirm)
          $scope.passwordMatch = true;
          return;
      }

      $scope.newpw.reset = false;
      UserInfo.updatePw($scope.newpw)

      // UserInfo.checkSignUp(loginInfo.email).then (function(founduser) {


      $scope.passwordConfirm = null;


  };


});
