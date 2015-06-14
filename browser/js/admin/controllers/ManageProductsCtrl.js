app.controller('ManageProductsCtrl', function ($location, $scope, AdminFactory, $state) {
  // $scope.$state = $state;
  // $scope.$watch('$state.$current.locals.globals.$stateParams.id', function () {
  //   // $scope.r
  // });

  console.log('manage product controller', $location.path())

  AdminFactory.getProducts().then(function(products){
    $scope.products = products;
    console.log('get all products', $scope.products)
    // console.log('hi',$state.$current.locals.globals.$stateParams.id)
  });

  // $scope.reloadRoute = function() {
  //   var rand = Math.floor(Math.random()*100);
  //   console.log(rand)
  //   // $state.go('adminOnly.products', {id: rand})// {}
  // }
 

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

  $scope.deleteProduct = function(product){
    console.log('deleteproduct', product)

    AdminFactory.deleteProduct(product._id);
  }




});
