geobarApp.directive('detalle', function(navigateService, Loading, $http, SERVER) {
  
  return {
  	
    restrict: 'E',
    scope: {},
    templateUrl: 'directivas/secciones/detalle/detalle.html',

    link:function ($scope, $elem, $attrs){
		
    	var _callback
    	$scope.navigateService = navigateService;

    	$scope.goMapa = function (){
    		
    		navigateService.go('mapa', {type:'item', item: $scope.item});
    		
    	}

    	$scope.goDir =  function (){

    		navigateService.go('mapa', {type:'dir', item: $scope.item});
    		
    	}

		$scope._set = function ($obj, $callback){

			_callback = $callback;
		
			$scope.item = $obj;
			$scope.url_img = SERVER + 'img/lugares/' + $scope.item.id + '/';
			Loading.mostrar();

			$http.get(SERVER+'ws.php?method=getDetalle&id=' + $scope.item.id).

			  success(function(data, status, headers, config) {
					
					$scope.long_desc = '';	
					
					$scope.long_desc = data.long_desc;
					$scope.fotos_detalle = data.fotos;
					Loading.ocultar();
					_callback()

			  }).
			  
			  error(function(data, status, headers, config) {
			  		$scope.long_desc = '';	
			  		$scope.url_img = 'img/default/';
					$scope.fotos_detalle = [$scope.item.tipo + '.png']
			  		Loading.ocultar();
			  		_callback()
			  });

		}


		navigateService.setSecciones('detalle', $scope._set)

    }

    


  };
});