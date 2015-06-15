app.controller('ManageProductsCtrl', function ($location, $scope, AdminFactory, $state, $modal) {
  // $scope.$state = $state;
  // $scope.$watch('$state.$current.locals.globals.$stateParams.id', function () {
  //   // $scope.r
  // });
  console.log('manage product controller', $location.path())

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
  { label: 'chefs'},
  { label: 'comedians'},
  { label: 'designers'},
  { label: 'entrepreneurs'},
  { label: 'musicians'},
  { label: 'teachers'},
  { label: 'writers'}
  ];

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

    $state.go('adminOnly.products')
  }

  $scope.deleteProduct = function(product){
    console.log('deleteproduct', product)

    AdminFactory.deleteProduct(product._id);
  }

  $scope.editProduct = function(product) {
    $scope.showForm = true;
    $scope.productPop = product;
    console.log('hit edit product...',product)
    // var id = product._id;

    var modalInstance = $modal.open({
      templateUrl: 'js/admin/template/editProducts.html',
      controller: 'editProductCtrl',
      resolve: {
        product: function() {
          return product;
        }
      }
    });
  }


});

app.controller('editProductCtrl', function($scope, AdminFactory, $modalInstance, product, $state) {
  console.log('product model', product);

  $scope.product = product;

  $scope.categories = [
  { label: 'chefs'},
  { label: 'comedians'},
  { label: 'designers'},
  { label: 'entrepreneurs'},
  { label: 'musicians'},
  { label: 'teachers'},
  { label: 'writers'}
  ];
  // $scope.selectCategory = $scope.categories.indexOf(product.category)
  $scope.findCategory = function(category){
    $scope.categories.forEach(a){
      if(a.label = product.category){
        return $scope.categories.indexOf(a);
      }     
    }
  }

  $scope.editProductDetail = function(productUpdate) {
    console.log('updateType', productUpdate)
    AdminFactory.editProduct(product._id, productUpdate)

  }

  $scope.close = function () {
    $modalInstance.close();
    $state.go('adminOnly.products')
  }

})
