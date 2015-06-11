geobarApp.directive('detalle', function(navigateService, $log, $http, SERVER) {
  
  return {
  	
    restrict: 'E',
    templateUrl: 'directivas/secciones/detalle/detalle.html',

    link:function ($scope, $elem, $attrs){
		
		$scope.$watch('navigateService.obj_detalle', function(oldVal, newVal, scope) {
			
			if(navigateService.obj_detalle!=null) cargar()

		});


		function cargar(){
			
			$scope.id = navigateService.obj_detalle['id'];
			
			$http.get(SERVER+'ws.php?method=getDetalleEvento&id=' + $scope.id).
			  success(function(data, status, headers, config) {
					$scope.nombre = data.nombre;
					$scope.desc = data.desc;
			  }).
			  error(function(data, status, headers, config) {
			  		
			  });



		}

    }

    


  };
});