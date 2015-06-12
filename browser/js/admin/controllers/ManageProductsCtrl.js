app.controller('ManageProductsCtrl', function ($scope, AdminFactory, $state) {
  // console.log('manage product controller')

  AdminFactory.getProducts().then(function(products){
    console.log('get all products')
      $scope.products = products;
  });

  $scope.categories = [
    { label: 'chefs'},
    { label: 'comedians'},
    { label: 'designers'},
    { label: 'entrepreneurs'},
    { label: 'musicians'},
    { label: 'teachers'},
    { label: 'writers'}
  ];

  $scope.productModel = {
    title: null,
    description: null,
    price: null,
    quantity: null,
    category: null,
    img: null
  }

  $scope.createProduct = function(product) {
    // console.log('createproduct controller', product)
    AdminFactory.createProduct(product);

    $scope.productModel = {
      title: null,
      description: null,
      price: null,
      quantity: null,
      category: null,
      img: null
    }

    $state.go('adminOnly.products')
  }

  $scope.getEditProduct = function(product) {
    $scope.showForm = true;
    console.log('get edit product', product)

    $scope.productModel = {
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      img: null
    }

    AdminFactory.getProducts(product._id)
  }

  $scope.editProduct = function(product) {
    //retrieve product info
    //populate the $scope.product
  }

  $scope.deleteProduct = function(product){
    console.log('deleteproduct', product)
      AdminFactory.deleteProduct(product._id);
  }




});
