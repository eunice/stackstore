app.controller('AdminCtrl', function ($scope, AdminFactory, $state, Session) {

  // write the admin authen func
  var isAdmin = function () {
      console.log(Session.user)
      return true;
    }


    // $scope.signin = {userType: "User"};
    // $scope.error = null;
    // $scope.passwordMatch = false;

    // $scope.sendSignin = function (loginInfo) {

    //     if ($scope.signin.password !== $scope.passwordConfirm) {
    //       console.log($scope.signin.password)
    //       console.log($scope.passwordConfirm)
    //         $scope.passwordMatch = true;
    //         return;
    //     }
    //
    //     UserInfo.checkSignUp(loginInfo.email).then (function(founduser) {
    //       console.log('founduser', founduser);
    //         if(founduser){
    //             $scope.error = true;
    //
    //         }else{
    //           console.log('signuppppp', loginInfo);
    //             UserInfo.signUpInfo(loginInfo);
    //
    //         }
    //     });
    //
    //     $scope.signin = {userType: "User"};
    //     $scope.passwordConfirm = null;
    // };

});
