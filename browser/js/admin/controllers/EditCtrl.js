app.controller('EditCtrl', function ($location, $scope, AdminFactory, $state) {
	console.log(' edit controller', $scope.$parent.product)
   
    $scope.showForm = true;
  $scope.getEditProduct = function(product) {
    $scope.editProductId = product._id
    console.log('get edit product', product.title)

    //populate the $scope.product

  }

  $scope.editProduct = function(product) {
    //retrieve only the updated product info!
    // var id = $scope.editProductId
    // var productUpdate = res
    
      // function read() {
      //   ngModel.$setViewValue(element.html());
      // }

      // ngModel.$render = function() {
      //   element.html(ngModel.$viewValue || "");
      // };

      // element.bind("blur keyup change", function() {
      //   scope.$apply(read);
      // });
    console.log('catch updated field detail', productUpdate)
    // AdminFactory.editProduct(id, product);
    // $state.go('adminOnly');
    setTimeout(function(){
      $state.go('adminOnly.products') 
    })
  }
});