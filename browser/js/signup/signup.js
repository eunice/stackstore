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

        $scope.error = null;

        UserInfo.signUpInfo(loginInfo);

        // AuthService.login(loginInfo).then(function () {
        //     $state.go('home');
        // }).catch(function () {
        //     $scope.error = 'Invalid login credentials.';
        // });

    };

});
