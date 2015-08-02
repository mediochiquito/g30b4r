geobarApp.factory('lugaresService', function($window){

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

               if(array_entero[i].tipo == 1 && bares==1) all.push(array_entero[i]);
              
               if(array_entero[i].tipo == 2 && restaurantes==1) all.push(array_entero[i]);
               
               if(array_entero[i].tipo == 3 && cines==1) all.push(array_entero[i]);

               if(array_entero[i].tipo == 5 && teatro==1) all.push(array_entero[i]);
              
            }

            return;       
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

