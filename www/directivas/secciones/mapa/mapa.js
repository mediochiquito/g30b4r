
geobarApp.directive('mapa', function(navigateService, lugaresService) {
  
	

  return {
    restrict: 'AE',
    templateUrl: 'directivas/secciones/mapa/mapa.html',
	 // scope:{caca:'@'},
    
    link: function (scope, elem, attrs){

        var map;
        var mapa_ya_inicializado = false;
       //var array_items;

        function initialize() {
                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(-34.397, 150.644),
                    mapTypeControl:false,
                    streetViewControl:false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById('un_mapa'),  mapOptions);
                mapa_ya_inicializado = true



        }


        scope._set = function (){

          if(!mapa_ya_inicializado) initialize()

          var locations = lugaresService.getAll();

          for (i = 0; i < locations.length; i++) {  
             
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i].lat, locations[i].lon),
                map: map
              });

    /*        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                  infowindow.setContent(locations[i][0]);
                  infowindow.open(map, marker);
                }
              })(marker, i));*/
          
          }

           navigator.geolocation.getCurrentPosition(function(pos) {
              map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
              var myLocation = new google.maps.Marker({
                  position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                  map: map,
                  title: "My Location"
              });
          });

          
        }


        navigateService.setSecciones('mapa', scope._set)
        

    }, 

  };
});