
geobarApp.directive('config', function($rootScope, $window, lugaresService) {
  
	

  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/config/config.html',
	  scope:{caca:'@'},
    
    link:function (scope, elem, attrs){

	   	scope.visible = true;
      
      scope.chkBares = $window.localStorage.getItem('bares')
      scope.chkRestaurantes = $window.localStorage.getItem('restaurantes')
      scope.chkCines = $window.localStorage.getItem('cines')
      scope.chkTeatros = $window.localStorage.getItem('teatros')
		  scope.distancia = $window.localStorage.getItem('distancia')


      scope.$watch('distancia', function($a, $b){
        
        $window.localStorage.setItem('distancia',  scope.distancia);
        
      })


      scope.update = function ($clave, $val){

        
        
        $window.localStorage.setItem($clave,  $val);

        lugaresService.setAll()
        $rootScope.$broadcast('cambioListaLugares');

      }

    }, 
  

  };
});