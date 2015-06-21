geobarApp.directive('detalle', function(navigateService, Loading, $http, SERVER) {
  
  return {
  	
    restrict: 'E',
    templateUrl: 'directivas/secciones/detalle/detalle.html',

    link:function ($scope, $elem, $attrs){
		
		$scope.$watch('navigateService.obj_detalle', function(oldVal, newVal, scope) {
			
			if(navigateService.obj_detalle!=null) cargar()

		});



		function cargar(){
			
			$scope.id = navigateService.obj_detalle['item']['id'];
			$scope.name = navigateService.obj_detalle['item']['name'];
			$scope.cat = navigateService.obj_detalle['item']['cat'];
			$scope.tel = navigateService.obj_detalle['item']['tel'];
			$scope.dir = navigateService.obj_detalle['item']['dir'];
			$scope.tipo = navigateService.obj_detalle['item']['tipo'];
			$scope.url_img = SERVER + 'img/lugares/' + $scope.id + '/';
			Loading.mostrar();
			$http.get(SERVER+'ws.php?method=getDetalleEvento&id=' + $scope.id).

			  success(function(data, status, headers, config) {
					$scope.mini_desc = data.mini_desc;
					$scope.long_desc = data.long_desc;
					$scope.fotos = data.fotos;
					Loading.ocultar();
			  }).
			  error(function(data, status, headers, config) {
			  		
			  });


		}

    }

    


  };
});