app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, UserInfo, $state) {
    //Need to update this part!!!!!!!!!!!!!!
    $scope.login = {userType: "User"};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

      // $scope.passwordMatch = false;
      //
      //   if ($scope.login.password !== $scope.login.passwordConfirm) {
      //       $scope.passwordMatch = true;
      //       return;
      //   }

        console.log('loginInfo');
        console.log('hit controller signup'+UserInfo.checkSignUp(loginInfo.email));

        UserInfo.checkSignUp(loginInfo.email).then (function(founduser) {
            console.log('founduser!!',founduser);
            if(founduser){
                $scope.error = true;
                console.log("$scope.error");
            }else{
                console.log('no error');
                UserInfo.signUpInfo(loginInfo);
            }

        });


        // AuthService.login(loginInfo).then(function () {
        //     $state.go('home');
        // }).catch(function () {
        //     $scope.error = 'Invalid login credentials.';
        // });

    };

});
