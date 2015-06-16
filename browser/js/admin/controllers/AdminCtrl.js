app.controller('AdminCtrl', function ($scope, Session, AuthService, AdminFactory, $state) {

  // write the admin authen func
  (function isAdmin () {

    if (Session.user.userType === "Admin") $scope.isAdmin=true

  })()

});
