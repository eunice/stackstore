app.controller('ManageOrdersCtrl', function ($scope, AdminFactory, $state, $modal) {

  $scope.status = [
    {label: 'PENDING'},
    {label: 'PROCESSED'},
    {label: 'REJECTED'},
    {label: 'CANCELLED'},
    {label: 'FULFILLED'}
  ]

  AdminFactory.getOrders().then(function(orders){
    console.log('get orders')
    $scope.orders = orders;
  });

  $scope.getAll = function () {
    $scope.getStatus()
  }

  $scope.getStatus = function(status) {
    console.log('getStatus', status)

    AdminFactory.getOrders(status).then(function(orders) {
      console.log('display orders by status', status)
      $scope.orders = orders;
    })
  }

  $scope.editOrder = function (order) {
    $scope.showForm = true;
    console.log('edit order...',order)
    var id = order._id;

    var modalInstance = $modal.open({
      templateUrl: 'js/admin/template/editOrders.html',
      controller: 'editOrderModalCtrl',
      resolve: {
        id: function() {
          return id;
        }
      }
    });
  }

  $scope.viewOrder = function (order) {
    $scope.showForm = true;
    console.log('view order...',order)
    var id = order._id;

    var modalInstance = $modal.open({
      templateUrl: 'js/admin/template/viewOrders.html',
      controller: 'viewOrderModalCtrl',
      resolve: {
        id: function() {
          return id;
        }
      }
    });
  }


});

//modal controllers-------------------------------------

app.controller('editOrderModalCtrl', function($scope, AdminFactory, $modalInstance, id, $state) {

  console.log('editOrderModalCtrl', id)

  $scope.updateOrderStatus = function(status) {
    console.log('updateOrderstatus', status)
    AdminFactory.updateOrderStatus(id, status)
  }

  $scope.status = [
    {label: 'PENDING'},
    {label: 'PROCESSED'},
    {label: 'REJECTED'},
    {label: 'CANCELLED'},
    {label: 'FULFILLED'}
  ]

  //when redirected, refresh order page doesn't work!!!!!!!

  $scope.close = function () {
    $modalInstance.close();
    $state.go('adminOnly.orders')
  }

})

app.controller('viewOrderModalCtrl', function($scope, AdminFactory, $modalInstance, id, $state) {

  console.log('viewOrderModalCtrl', id)

  AdminFactory.getOrderById(id).then(function(orders){
    console.log('get orders by id')
    $scope.order = orders;
  });

  //when redirected, refresh order page doesn't work!!!!!!!

  $scope.close = function () {
    $modalInstance.close();
    $state.go('adminOnly.orders')
  }

})
