
geobarApp.directive('mapa', function(navigateService, lugaresService, DistancePostion, cordovaGeolocationService) {
  
	

  return {
    restrict: 'AE',
    templateUrl: 'directivas/secciones/mapa/mapa.html',
	 // scope:{caca:'@'},
    
    link: function (scope, elem, attrs){

        var map;
        var mapa_ya_inicializado = false;
        var array_markers =  new Array();
       
        
       
        function initialize() {
                var mapOptions = {
                    zoom: 13,
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
                map = new google.maps.Map(document.getElementById('el-mapa'),  mapOptions);
                mapa_ya_inicializado = true
        }


        function _dispose(){
            for (i in array_markers) {
              array_markers[i].setMap(null);
            }
          
        }
          
        scope._set = function ($id){

          if(!mapa_ya_inicializado) initialize()
        

         setTimeout(function (){
               _dispose();
             google.maps.event.trigger(map, 'resize');
             var locations = lugaresService.getAll();
             array_markers = new Array();
             
             for (i = 0; i < locations.length; i++) {  
              
              var tipo;
              switch(locations[i].tipo){
                case '1': tipo='bar'; break;
                case '2': tipo='restaurant'; break;
                case '3': tipo='cine' ;break;
              }
             
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(Number(locations[i].lat)+(Math.random()*0.098), locations[i].lon-(Math.random()*0.098)),
                map: map,
                optimized: true, 
                icon: {
                         url:'img/markers/'+tipo+'.png',
                         scaledSize: new google.maps.Size(30, 30),
                         anchor: new google.maps.Point(15,15)
                        },
                num: i
              });

              array_markers.push(marker);

          /*
              var d = distance();
            
              if(d > distancia) continue;*/
              
             /* console.log(DistancePostion.enKilometros(111, 
                  111, 
                   22, 
                   22, 'K'));*/

  
              google.maps.event.addListener(array_markers[i], 'click', function() {
                 
                 alert(this.num)
                  
              });
           }


           // centrarme a mi
           var my_pos = cordovaGeolocationService.getUltimaPosicion();
           if(my_pos!=null){

              map.setCenter(new google.maps.LatLng(my_pos.coords.latitude, my_pos.coords.longitude));
              var myMarker = new google.maps.Marker({

                                position: new google.maps.LatLng(my_pos.coords.latitude, my_pos.coords.longitude),
                                optimized: false, 
                                icon: {
                                       url:'img/markers/yo.png',
                                         scaledSize: new google.maps.Size(20, 30),
                                         anchor: new google.maps.Point(10,30)
                                      }, 
                                map: map });
           }
           
 

         }, 600)
         


          
        }

        initialize()
        navigateService.setSecciones('mapa', scope._set)
        

    }, 

  };
});