app.controller('HeroController', function($scope, Hero, categories, $modalInstance, $state, $modal) {

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

  $scope.createProduct = function (product) {
    Hero.createProduct(product);
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

  $scope.close = function () {
    $modalInstance.close();
  }

});