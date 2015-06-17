app.controller('HeroController', function($scope, Hero, categories, product, $modalInstance, $state, $modal) {
  $scope.created = false;
  $scope.categories = categories;
  $scope.productModel = {
    title: null,
    description: null,
    price: null,
    quantity: null,
    category: null,
    img: null
  }

  $scope.createProduct = function(createdProduct) {
    Hero.createProduct(createdProduct);
    $scope.productModel = {
      title: null,
      description: null,
      price: null,
      quantity: null,
      category: null,
      img: null
    }
    $scope.created = true;
  }

  $scope.editProductDetail = function(productUpdate) {
    $scope.showAlert = true;
    Hero.editProduct(product._id, productUpdate)
  }

  $scope.deleteProductConf = function() {
    $scope.showAlert = true;
    Hero.deleteProduct(product._id);
  }

  $scope.close = function() {
    $modalInstance.close();
  }

});