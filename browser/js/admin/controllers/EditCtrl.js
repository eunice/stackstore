app.controller('EditCtrl', function ($location, $scope, AdminFactory, $state) {
	console.log('manage product controller', $location.path())
	  // AdminFactory.getProducts().then(function(products){
   //  	console.log('get all products')
   //    $scope.products = products;
  // });
    // $state.go($state.current, {}, {reload: true})// {}
   

  $scope.getEditProduct = function(product) {
    $scope.showForm = true;
    $scope.editProductId = product._id
    console.log('get edit product', product.title)

    //populate the $scope.product
    $scope.productModel = {
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      img: null
    }

    $state.go('adminOnly.products.edit')
  }

  $scope.editProduct = function(product) {
    //retrieve only the updated product info!
    var id = $scope.editProductId
    var productUpdate = res
    
      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    console.log(productUpdate)
    // AdminFactory.editProduct(id, product);
    $state.go('adminOnly');
  }
});