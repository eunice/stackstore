app.controller('ManageProductsCtrl', function ($location, $scope, AdminFactory, $state, $modal) {
  // $scope.$state = $state;
  // $scope.$watch('$state.$current.locals.globals.$stateParams.id', function () {
  //   // $scope.r
  // });
  // console.log('hit manage product controller', $location.path())

  AdminFactory.getProducts().then(function(products){
    $scope.products = products;
    // console.log('get all products', $scope.products)
    // console.log('hi',$state.$current.locals.globals.$stateParams.id)
  });

  // $scope.reloadRoute = function() {
  //   var rand = Math.floor(Math.random()*100);
  //   console.log(rand)
  //   // $state.go('adminOnly.products', {id: rand})// {}
  // }


  $scope.categories = [
    {label: 'comedians'},
    {label: 'chefs'},
    {label: 'writers'},
    {label: 'teachers'},
    {label: 'musicians'},
    {label: 'entrepreneurs'},
    {label: 'designers'},
    {label: 'actors'},
    {label: 'athletes'}
  ]

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

  $scope.createProduct = function() {
    console.log('createproduct controller')

    var modalInstance = $modal.open({
      templateUrl: 'js/admin/template/createProducts.html',
      controller: 'createProductModalCtrl',
      resolve: {
        categories: function(){
          return $scope.categories;
        }
      }
    });
  }


  $scope.editProduct = function(product) {
    // console.log('hit edit product...',product)

    var modalInstance = $modal.open({
      templateUrl: 'js/admin/template/editProducts.html',
      controller: 'editProductModalCtrl',
      resolve: {
        product: function() {
          return product;
        },

        categories: function(){
          return $scope.categories;
        }
      }
    });
  }

  $scope.deleteProduct = function(product){
    console.log('deleteproduct', product)

    var modalInstance = $modal.open({
      templateUrl: 'js/admin/template/deleteProducts.html',
      controller: 'deleteProductModalCtrl',
      resolve: {
        product: function(){
          return product;
        }
      }
    });
  }

});

// Modal Controllers---------------------------------------------------------

app.controller('createProductModalCtrl', function($scope, AdminFactory, categories, $modalInstance, $state, $modal) {

  // console.log('createProductModalCtrl')
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

  $scope.createProduct = function (product) {
    AdminFactory.createProduct(product);

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
    $state.go('adminOnly.products')
  }


});

app.controller('editProductModalCtrl', function($scope, AdminFactory, $modalInstance, product, categories, $state) {
  // console.log('product model', product);

  $scope.product = product;
  $scope.categories = categories;

  $scope.editProductDetail = function(productUpdate) {
    // console.log('updateType', productUpdate)
    $scope.showAlert = true;
    AdminFactory.editProduct(product._id, productUpdate)

  }

  $scope.close = function () {
    $modalInstance.close();
    $state.go('adminOnly.products')
  }

})

app.controller('deleteProductModalCtrl', function($scope, AdminFactory, $modalInstance, product, $state) {
  // console.log('hit modal controller',product)
  $scope.product = product;

  $scope.deleteProductConf = function(product) {
    // console.log('hit delete conf', product)
    $scope.showAlert = true;
    AdminFactory.deleteProduct(product._id);
  }

  $scope.close = function () {
    $modalInstance.close();
    $state.go('adminOnly.products')
  }

})


