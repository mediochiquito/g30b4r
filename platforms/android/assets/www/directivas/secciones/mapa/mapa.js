
    geobarApp.directive('mapa', function(navigateService, ToastService, lugaresService, eventosService, DistancePostion, cordovaGeolocationService, $window) {
      
      return {

        restrict: 'AE',
        scope: {},
        templateUrl: 'directivas/secciones/mapa/mapa.html',

        link: function (scope, elem, attrs){

            var map;
            var mapa_ya_inicializado = false;
            var array_markers =  new Array();
            var myMarker  = null;
            var bounds;
            var mapa_type = '';
            var directionsDisplay;
            var directionsService;
            scope.itemSelected  = null;
            scope.navigateService = navigateService;
            



            scope.goInfo = function (){

              navigateService.go('detalle',  scope.itemSelected);
                
            }
            scope.goDir =  function (){

              navigateService.go('mapa', {type:'dir', item: scope.itemSelected});
              
            }
            scope.goTel =  function (){

              $window.open('tel://' + scope.itemSelected.tel);
              
            }
            function initialize() {
                    
                    var mapOptions = {
                        zoom: 15,
                        center: new google.maps.LatLng(-34.397, 150.644),
                        mapTypeControl:false,
                        streetViewControl:false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles:[
                                  {
                                      featureType: "poi",
                                      elementType: "labels",
                                      stylers: [
                                            { visibility: "off" }
                                      ]
                                  }
                               ]

                    };

                    directionsService = new google.maps.DirectionsService();
                    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});
                    map = new google.maps.Map(document.getElementById('el-mapa'),  mapOptions);
                    mapa_ya_inicializado = true

            }


            function _dispose(){
                for (i in array_markers) {
                  array_markers[i].setMap(null);
                }
                if(myMarker != null) myMarker.setMap(null);

                directionsDisplay.setMap(null);
            }


            function agregar_marcador($item){

                var tipo;
                switch($item.tipo){
                  case '1': tipo='bar'; break;
                  case '2': tipo='restaurant'; break;
                  case '3': tipo='cine' ;break;
                  case '4': tipo='evento' ;break;
                }

                marker = new google.maps.Marker({
                  position: new google.maps.LatLng($item.lat, $item.lon),
                  map: map,
                  optimized: true, 
                  icon: {
                           url:'img/markers/' + tipo + '.png',
                           scaledSize: new google.maps.Size(30, 30),
                           anchor: new google.maps.Point(15,15)
                          }
                });

                array_markers.push(marker);
                if(mapa_type == 'all'){
                  
                  google.maps.event.addListener(marker, 'click', function() {
                    scope.itemSelected = $item;
                    scope.$apply();
                  });

                }
               
                bounds.extend(marker.getPosition());
            }


            scope.$on('cambioListaLugares', function(){
       
               if(mapa_type == 'all') scope._set({type: 'all'})
              
           }); 


            scope._set = function ($obj){       

             // alert('mapa set');

              if(!mapa_ya_inicializado) initialize();




                bounds = new google.maps.LatLngBounds(); 
                mapa_type = $obj.type
                scope.itemSelected = null; 

                var my_pos = cordovaGeolocationService.getUltimaPosicion();
                //console.log($obj)
                // !!!! if(mapa_type == 'all' && no encontro gps) error
                // arranco con delay para dejar ser a la tranicion
                setTimeout(function (){
                     
                    _dispose();

                    array_markers = new Array();
 
                    if(my_pos != null){
                        
                        myMarker = new google.maps.Marker({
                                        position: new google.maps.LatLng(my_pos.coords.latitude, my_pos.coords.longitude),
                                        optimized: true, 
                                        icon: {
                                               url:'img/markers/yo.png',
                                                 scaledSize: new google.maps.Size(20, 30),
                                                 anchor: new google.maps.Point(10,30)
                                              }, 
                                        map: map });

                        bounds.extend(myMarker.getPosition());
                    }

                    if(mapa_type == 'dir'){

                        agregar_marcador($obj.item)  
                        directionsDisplay.setMap(map);
                        var stroke_color;
                        if($obj.item.tipo ==1) stroke_color = '#ff99ff';
                        if($obj.item.tipo ==2) stroke_color = '#EFE923';
                        if($obj.item.tipo ==3) stroke_color = '#28eaa4';
                        if($obj.item.tipo ==4) stroke_color = '#00ccff';

                        directionsDisplay.setOptions({polylineOptions:{strokeColor: stroke_color, strokeOpacity: 0.7, strokeWeight: 8}})

                    }   
                    if(mapa_type == 'item'){
                        
                        agregar_marcador($obj.item)  
              
                    } 
                    

                    if(mapa_type == 'all'){
                        
                        if(my_pos != null){

                            //lugares
                            var lugares = lugaresService.get();
                            var cantidad_lugares = lugares.length;
                            for (i = 0; i < cantidad_lugares; i++) {  
                               agregar_marcador(lugares[i])
                            }
                            
                            //eventos
                            var eventos = eventosService.get();
                            var cantidad_eventos = eventos.length
                            for (i = 0; i < cantidad_eventos; i++) {  
                                agregar_marcador(eventos[i])
                            }

                        } else {

                            ToastService.show('No hemos enctroado tu ubicación.', 'long', 'center');

                        }

                    }
                    
                  
                   
                    setTimeout(function (){
                       
                        google.maps.event.trigger(map, 'resize');

                        if($obj.type == 'item'){
                           map.setZoom(16);
                           map.setCenter(new google.maps.LatLng($obj.item.lat, $obj.item.lon));
                        }
                        else if($obj.type == 'dir'){
                             map.fitBounds(bounds);
                             ver_ruta()

                        }
                        else{
                            map.fitBounds(bounds);
                        }

                    }, 100);

                }, 600);
            }


            function ver_ruta() {
                
                  var request = {
                      origin: myMarker.getPosition(),
                      destination: array_markers[0].getPosition(),
                      
                      travelMode: google.maps.TravelMode['DRIVING']
                  };
                  directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                       directionsDisplay.setDirections(response);
                    }
                    console.log(status)
                  });
            }

          initialize()
          navigateService.setSecciones('mapa', scope._set)
            
        }, 
      };
    });