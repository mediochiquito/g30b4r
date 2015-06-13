
geobarApp.directive('mapa', function() {
  
	

  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/mapa/mapa.html',
	  scope:{caca:'@'},
    
    link:function (scope, elem, attrs){

	   	scope.visible = true;

		

    }, 
   

  };
});