app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, UserInfo, $state) {
    //Need to update this part!!!!!!!!!!!!!!
    $scope.signin = {userType: "User"};
    $scope.error = null;
    $scope.passwordMatch = false;

    $scope.sendSignin = function (loginInfo) {

        if ($scope.signin.password !== $scope.passwordConfirm) {
          console.log($scope.signin.password)
          console.log($scope.passwordConfirm)
            $scope.passwordMatch = true;
            return;
        }

        UserInfo.checkSignUp(loginInfo.email).then (function(founduser) {
          console.log('founduser', founduser);
            if(founduser){
                $scope.error = true;

            }else{
              console.log('signuppppp', loginInfo);
                UserInfo.signUpInfo(loginInfo);

            }
        });

        $scope.signin = {userType: "User"};
        $scope.passwordConfirm = null;
    };

});