geobarApp.factory('navigateService', function($rootScope){
	
	/*this.go = function (name) {
       	alert(name)
    }*/

	var estado = 'caca'

	return {
	    go: function(name) {
	      	alert(estado)
	      	estado = name
	    }
	 };

/*	return function(){
		
		go: function ($seccion){
			alert($seccion)
			return 

		}

	}*/
})
