
geobarApp.directive('mapa', function(navigateService,mapaService) {
  
	

  return {
    restrict: 'AE',
    templateUrl: 'directivas/secciones/mapa/mapa.html',
	 // scope:{caca:'@'},
    
    link: function (scope, elem, attrs){

        navigateService.setSecciones('mapa', scope)
        
        scope._set = function (){

          mapaService.mostrar();

          //scope.etiloContent = 'contentBg1'



        }

    }, 

  };
});