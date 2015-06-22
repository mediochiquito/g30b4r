geobarApp.factory('lugaresService', function(){

	var all;

	return {
		setAll: function() {
			all = JSON.parse( window.localStorage.getItem('json_lugares'));
    		return;       
        },
        getAll: function() {
            return all;
        }
    };



})
