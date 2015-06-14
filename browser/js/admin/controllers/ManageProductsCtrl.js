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

  //Image upload... not working yet
  // inject --> $file, $upload
  // $scope.uploadImg = function($files) {
  //   for(var i=0; i< $files.length; i++) {
  //     var file = $files[i];
  //     if (!file.type.match(/image.*/)) {
  //       //if file is not an image
  //     };
  //     $scope.upload = $upload.upload({
  //       url: /products/upload,
  //       data: {myObj: $scope.myModelObj},
  //       file: file
  //     }).progress(function(evt){
  //       console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
  //     }).success(function(data, status, headers, config) {
  //       console.log(data);
  //     })
  //   }
  // }

  $scope.createProduct = function(product) {
    // console.log('createproduct controller', product)
    $scope.showForm = true;
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

<<<<<<< HEAD
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

    AdminFactory.editProduct(id, product);

  }

=======
>>>>>>> a8cc9186abae24a35691614cf9e016db874afbdc
  $scope.deleteProduct = function(product){
    console.log('deleteproduct', product)

    AdminFactory.deleteProduct(product._id);
  }




});
