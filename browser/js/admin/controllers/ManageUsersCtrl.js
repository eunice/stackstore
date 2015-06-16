app.controller('ManageUsersCtrl', function ($scope, AdminFactory, $state, $modal) {

  AdminFactory.getUsers().then(function(users){
    console.log('get all users')
      $scope.users = users;
  });

  $scope.userTypes = [
    { label: 'User'},
    { label: 'Admin'},
    { label: 'Hero'}
  ];

  $scope.getAll = function () {
    AdminFactory.getUsers().then(function(users) {
      $scope.users = users;
    })
  }

  $scope.getUserTypes = function (type) {
    console.log('get user type', type)
    AdminFactory.getUsers(type).then(function(users) {
      $scope.users = users;
    })
  }

  $scope.deleteUser = function (user) {
    var id = user._id;
    console.log('delete',id)
    AdminFactory.deleteUser(id);
  }

  $scope.editUser = function (user) {
    // $scope.showForm = true;
    console.log('edit user...',user)
    var id = user._id;

    var modalInstance = $modal.open({
      templateUrl: 'js/admin/template/editUsers.html',
      controller: 'editUserModalCtrl',
      resolve: {
        id: function() {
          return id;
        }
      }
    });

    // modalInstance.result.then(function(selectItem) {
    //   $scope.selected = selectedItem
    // }, function () {})

  }

});

app.controller('editUserModalCtrl', function($scope, AdminFactory, $modalInstance, id, $state) {

  console.log('editUserModalCtrl', id)

  $scope.updateUserType = function(type) {
    console.log('updateType', type)
    AdminFactory.updateUserType(id, type);
  }

  $scope.pwReset = function() {
    console.log('pwReset', id)
    AdminFactory.pwReset(id);
  }

  $scope.userTypes = [
    { label: 'User'},
    { label: 'Admin'},
    { label: 'Hero'}
  ];

  //when redirected, refresh user page doesn't work!!!!!!!

  $scope.close = function () {
    $modalInstance.close();
    $state.go('adminOnly.users')
  }

})
