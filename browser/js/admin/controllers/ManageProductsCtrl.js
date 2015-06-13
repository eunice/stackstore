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

  $scope.selectCategory = null;

  $scope.getAll = function () {
    $scope.getCategory()
  }

  $scope.getCategory = function(category) {
    console.log('getCategory', category)

    AdminFactory.getProducts(category).then(function(product) {
      console.log('display product', product)
      $scope.products = product;
    })

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

    {category: comedian, price: 23423}
    AdminFactory.editProduct(id, product);

  }

  $scope.deleteProduct = function(product){
    console.log('deleteproduct', product)

      AdminFactory.deleteProduct(product._id);
  }




});
