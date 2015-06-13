app.controller('ManageUsersCtrl', function ($scope, AdminFactory, $state) {

  AdminFactory.getUsers().then(function(users){
    console.log('get all users')
      $scope.users = users;
  });

});
