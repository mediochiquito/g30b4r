geobarApp.directive('detalle', function(navigateService, Loading, $http, SERVER) {
  
  return {
  	
    restrict: 'E',
    templateUrl: 'directivas/secciones/detalle/detalle.html',

    link:function ($scope, $elem, $attrs){
		
    	var _callback

		$scope._set = function ($obj, $callback){

			_callback = $callback;
			$scope.id   = $obj.item.id;
			$scope.name = $obj.item.name;
			$scope.cat  = $obj.item.cat;
			$scope.tel  = $obj.item.tel;
			$scope.dir  = $obj.item.dir;
			$scope.tipo = $obj.item.tipo;
			
			$scope.url_img = SERVER + 'img/lugares/' + $scope.id + '/';
			
			Loading.mostrar();

			$http.get(SERVER+'ws.php?method=getDetalle&id=' + $scope.id).

			  success(function(data, status, headers, config) {
					
					$scope.long_desc = data.long_desc;
					$scope.fotos_detalle = data.fotos;
					Loading.ocultar();
					_callback()


			  }).
			  
			  error(function(data, status, headers, config) {
			  		$scope.long_desc = '';	
			  		Loading.ocultar();
			  		_callback()
			  });

		}


		 navigateService.setSecciones('detalle', $scope._set)

    }

    


  };
});