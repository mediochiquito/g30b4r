app.filter('tipoEvento', function() {
  return function(pois, tipo) {

    var r = new Array()
    for(var poi in pois){
        if(tipo == pois[poi].tipo){
            r.push( pois[poi])
        }

    }
   
    return r;
  };
});


app.controller('PoisCtrl', function($scope, $http, $document, $routeParams, Upload, $rootScope, $mdDialog) {


    $rootScope.seccion = 'POIS';
    $scope.poi = {};
    $scope.poi.thumb = ""
    $scope.array_tipo_de_lugares = [{name: 'Bares', id:1}, {name: 'Restaurantes', id:2}, {name: 'Cines', id:3}, {name: 'Teatros', id:5}, {name: 'Eventos', id:4}]
    $http.get('../ws.php?method=getListaAllPois').
      
          success(function(data, status, headers, config) {
               $scope.array_pois = data
          }).
          error(function(data, status, headers, config) {
             $scope.array_pois = []
          });


	$scope.$watch('filesImgs', function () {
         
         try{
             $scope.upload($scope.filesImgs, 'filesImgs');
         }catch(e){}
       
    });
    $scope.$watch('fileThumb', function () {
         
         try{
             $scope.upload($scope.fileThumb, 'fileThumb');
         }catch(e){}
       
    });
   
    $scope.upload = function (files, $type) {

       if (files && files.length) {

            var cant_subir = files.length;
            var subidas = 0;

            for (var i = 0; i < cant_subir; i++) {

                var file = files[i];
            
                Upload.upload({

                    url: '../ws.php?method=uploadImg',
                    file: file

                }).progress(function (evt) {
                	$rootScope.cargando = true; 
                    //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {

                    if($scope.poi.imgs == null){
                        $scope.poi.imgs = new Array();
                    }

                     if($scope.poi.thumb == null){
                        $scope.poi.thumb = "";
                    }

                    if($type == 'filesImgs') $scope.poi.imgs.push(data);
                    if($type == 'fileThumb') $scope.poi.thumb = data;

                    subidas++;
                    if(subidas==cant_subir)  $rootScope.cargando = false;     
                   
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })

            }
        }
    };


    $scope.submitForm = function() {
     	      
        $rootScope.cargando = true;   


        var  req = {
             method: 'POST',
             url: '../ws.php?method=savePoi',
             headers: {
               'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8'
             },
             data: $scope.poi
        }   

        $http(req).then( 
            function(data){
                $rootScope.cargando = false;    
                if( $scope.poi.id == null)   $scope.array_pois.push( $scope.poi)   
                $scope.poi.id = data.data
                $scope.poi = {};
                 $mdDialog.hide();
            }, function(){

               $rootScope.cargando = false;   

            }
        );

    };
    $scope.add = function ($e){
        $scope.poi = {}
          $scope.showForm($e)

    }

    $scope.eliminar = function ($item){

        

    }
    $scope.editar = function ($item, $e){

        $scope.poi = $item;

        var array_pub_ini =  String($item.pub_ini).split(' ')
        var fecha_pub_ini =  array_pub_ini[0].split('-')
        var pub_ini = new Date(Number(fecha_pub_ini[0]), Number(fecha_pub_ini[1])-1, Number(fecha_pub_ini[2]));

        var array_pub_fin =  String($item.pub_fin).split(' ')
        var fecha_pub_fin =  array_pub_fin[0].split('-')
        var pub_fin = new Date(Number(fecha_pub_fin[0]), Number(fecha_pub_fin[1])-1, Number(fecha_pub_fin[2]));


        $scope.poi.iniPub = pub_ini
	   	$scope.poi.finPub = pub_fin;


        $scope.showForm($e)

    }


     $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };


     $scope.showForm = function(e) {
        
        $mdDialog.show({
      
         scope: $scope, 
          templateUrl: 'views/formPoi.html',
          preserveScope :true,
          parent: angular.element(document.body), 
          targetEvent: e,
         
        })

        .then(function(answer) {
            // $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
            // $scope.alert = 'You cancelled the dialog.';
        });
      };

     

});

