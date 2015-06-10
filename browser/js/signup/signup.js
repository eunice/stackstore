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
        console.log('loginInfo')

        UserInfo.checkSignUp(loginInfo.email).then (function(founduser) {

            if(founduser){
                $scope.error = true;
                console.log("$scope.error")
            }else{
                console.log('no error')
                UserInfo.signUpInfo(loginInfo);
            }
            
        });

        console.log('hit controller signup'+UserInfo.checkSignUp(loginInfo.email))
        // AuthService.login(loginInfo).then(function () {
        //     $state.go('home');
        // }).catch(function () {
        //     $scope.error = 'Invalid login credentials.';
        // });

    };

});
