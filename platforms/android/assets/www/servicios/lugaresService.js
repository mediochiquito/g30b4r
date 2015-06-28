geobarApp.factory('lugaresService', function(){

	var all;

	return {
		setAll: function() {
			all = JSON.parse( window.localStorage.getItem('json_lugares'));
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

