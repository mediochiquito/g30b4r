geobarApp.service('mapaService', function($rootScope, SCREEN_SIZE){

	var map = null;
	this.init = function(){
		try{
			map = plugin.google.maps.Map.getMap();
            map.on(plugin.google.maps.event.MAP_READY, function () {
                map.setClickable( false );
            });
		}catch(e){}
            
	}


 	this.mostrar = function(){
 		
	 	/*	$rootScope.etiloContent ='bg1';
	 		$rootScope.viewBg ='viewBg1';
		*/
 		var div = document.getElementById('map_canvas');
 			div.style.height = (window.innerHeight-80) + 'px'

 		if(map){
 			map.setVisible(true)
 			map.setClickable(true);
 			map.setDiv(div);
 			map.refreshLayout()

 			var onSuccess = function(location) {
			 
			 		/* var msg = ["Current your location:\n",
				    "latitude:" + location.latLng.lat,
				    "longitude:" + location.latLng.lng,
				    "speed:" + location.speed,
				    "time:" + location.time,
				    "bearing:" + location.bearing].join("\n");*/

					 /* map.addMarker({
					    'position': location.latLng
					  }, function(marker) {
					      // marker.showInfoWindow();
					  });*/

				    map.setOptions({
					  'controls': {
					    'compass': true,
					    'myLocationButton': true,
					    'zoom': true // Only for Android
					  }
					});
				  
					map.animateCamera({
					  'target': location.latLng,
					/*  'tilt': 60,
					  'zoom': 18,
					  'bearing': 140,*/
					  'duration': 2000 // = 5 sec.
					}, function() {
					
					});

				  //setCenter(location.latLng);

			};

			var onError = function(msg) {
			  alert("error: " + msg);
			};
			map.getMyLocation(onSuccess, onError);


 		}




 	}


 	this.ocultar = function (){

 		if(map) {
 			map.setVisible(false);
 			map.setClickable( false );
 			
 		}
 		/*$rootScope.viewBg ='viewBg0';
 		$rootScope.etiloContent ='bg0'*/

 	}

})
