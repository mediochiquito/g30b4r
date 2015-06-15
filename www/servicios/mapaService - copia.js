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
 		
 		$rootScope.etiloContent ='bg1';
 		$rootScope.viewBg ='viewBg1';

 		var div = document.getElementById('map_canvas');
 			div.style.height = (window.innerHeight-80) + 'px'

 		if(map){
 			map.setVisible(true)
 			map.setClickable(true);
 			map.setDiv(div);
 			map.refreshLayout()
 		}

 	}


 	this.ocultar = function (){

 		if(map) {
 			map.setVisible(false);
 			map.setClickable( false );
 			
 		}
 		$rootScope.viewBg ='viewBg0';
 		$rootScope.etiloContent ='bg0'

 	}

})
