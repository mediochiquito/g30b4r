
geobarApp.directive('mapa', function(navigateService,mapaService) {
  
	

  return {
    restrict: 'AE',
    templateUrl: 'directivas/secciones/mapa/mapa.html',
	 // scope:{caca:'@'},
    
    link: function (scope, elem, attrs){

        
        scope._set = function (){

          // mapaService.mostrar();
          
          //scope.etiloContent = 'contentBg1'

        }
        navigateService.setSecciones('mapa', scope._set)
        

    }, 

  };
});