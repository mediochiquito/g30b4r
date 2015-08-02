geobarApp.factory('lugaresService', function($window, cordovaGeolocationService, DistancePostion){

	var all;

	return {

		setAll: function() {
			
            var bares = $window.localStorage.getItem('bares')
            var restaurantes = $window.localStorage.getItem('restaurantes')
            var cines = $window.localStorage.getItem('cines')
            var teatro = $window.localStorage.getItem('cines')

            var array_entero =  JSON.parse( window.localStorage.getItem('json_lugares'));
            var cantidad_lugares = array_entero.length
            all = new Array();




            for(var i=0; i<cantidad_lugares; i++){

               if(array_entero[i].tipo == 1 && bares==1) this.addPoiToAll(array_entero[i]); 
               if(array_entero[i].tipo == 2 && restaurantes==1) this.addPoiToAll(array_entero[i]);
               if(array_entero[i].tipo == 3 && cines==1) this.addPoiToAll(array_entero[i]);
               if(array_entero[i].tipo == 5 && teatro==1) this.addPoiToAll(array_entero[i]);
              
            }
            console.log(all)
            return;       
        },

        addPoiToAll:function ($poi){

            var my_pos = cordovaGeolocationService.getUltimaPosicion()
            
            if(my_pos!=null){

                var d = DistancePostion.enKilometros(my_pos.coords.latitude, my_pos.coords.longitude, $poi.lat, $poi.lon)
               
                $poi['distancia'] = d

            }



             all.push($poi);
               
  

        },


        get: function() {
            return all;
        }
    };

})

geobarApp.factory('eventosService', function(){

    var all;

    return {
        setAll: function() {

            all = JSON.parse( window.localStorage.getItem('json_eventos'));

            
            return;       
        },
        get: function() {
            return all;
        }
    };

})

