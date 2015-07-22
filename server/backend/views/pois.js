app.controller('PoisCtrl', function($scope, $http, $document, $routeParams, Upload, $rootScope) {


	$scope.$watch('files', function () {
        $scope.upload($scope.files);
       
    });

    $scope.upload = function (files) {

    	

       if (files && files.length) {
           
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                $rootScope.cargando = true; 
                
                Upload.upload({

                    url: '../ws.php?method=uploadImg',
                    file: file

                }).progress(function (evt) {
                	 $rootScope.cargando = true; 
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                	$rootScope.cargando = false; 
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        }
    };

	
	$http.get('../ws.php?method=getListaAllPois').
	  
	  success(function(data, status, headers, config) {
		   $scope.array_pois = data
	  }).
	  error(function(data, status, headers, config) {
	  	 $scope.array_pois = []
	  });


    $scope.submitForm = function() {
     	
	 /*
     $http.post('../ws.php?method=getListaAllPois',  {msg:'hello word!', $scope.obj}).
	  
	  success(function(data, status, headers, config) {
		   $scope.array_pois = data
	  }).
	  error(function(data, status, headers, config) {
	  	 $scope.array_pois = []
	  });
	*/

    };


    $scope.editar = function ($item){

	   	$scope.poi = $item;
	   	console.log($scope.obj.flow);

    }

});