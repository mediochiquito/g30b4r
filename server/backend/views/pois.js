app.controller('PoisCtrl', function($scope, $http, $document, $routeParams, Upload, $rootScope) {

    
    $scope.imagesHeader = []

	$scope.$watch('poi.files', function () {
         
         try{
             $scope.upload($scope.poi.files);
         }catch(e){}
       
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

                    
                }).success(function (data, status, headers, config) {
                	$rootScope.cargando = false; 
                 
                    $scope.imagesHeader.push(data)

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
     	      
        $rootScope.cargando = true;   

        console.log($scope.poi.files)


        var  req = {
             method: 'POST',
             url: '../ws.php?method=savePoi',
             headers: {
               'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
             },
             data:  $scope.poi
        }   

        $http(req).then( 

            function(){


                $rootScope.cargando = false;    

            }, function(){


               $rootScope.cargando = false;   

            }
        );

    };


    $scope.editar = function ($item){

        $scope.poi = $item;

        var array_pub_ini =  String($item.pub_ini).split(' ')
        var fecha_pub_ini =  array_pub_ini[0].split('-')
        var pub_ini = new Date(Number(fecha_pub_ini[0]), Number(fecha_pub_ini[1])-1, Number(fecha_pub_ini[2]));

        var array_pub_fin =  String($item.pub_fin).split(' ')
        var fecha_pub_fin =  array_pub_fin[0].split('-')
        var pub_fin = new Date(Number(fecha_pub_fin[0]), Number(fecha_pub_fin[1])-1, Number(fecha_pub_fin[2]));


        $scope.poi.iniPub = pub_ini
	   	$scope.poi.finPub = pub_fin;

    }

});