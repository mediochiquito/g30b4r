
geobarApp.directive('mapa', function(navigateService,mapaService) {
  
	

  return {
    restrict: 'AE',
    templateUrl: 'directivas/secciones/mapa/mapa.html',
	 // scope:{caca:'@'},
    
    link: function (scope, elem, attrs){

         var map;
        function initialize() {
                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(-34.397, 150.644),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById('un_mapa'),  mapOptions);
        }


        scope._set = function (){

          // mapaService.mostrar();
          initialize()
          //scope.etiloContent = 'contentBg1'

        }


        
        navigateService.setSecciones('mapa', scope._set)
        

    }, 

  };
});