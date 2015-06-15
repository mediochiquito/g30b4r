window.onerror = function(message, file, line) {
  var error = [];
  error.push('---[error]');
  if (typeof message == "object") {
    var keys = Object.keys(message);
    keys.forEach(function(key) {
      error.push('[' + key + '] ' + message[key]);
    });
  } else {
    error.push(line + ' at ' + file);
    error.push(message);
  }
  alert(error.join("\n"));
};
var app = {
   
    initialize: function() {
        this.bindEvents();
       
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
      
        try{
           
            StatusBar.hide()


                  angular.bootstrap(document, ["geobarApp"]);
        }catch(e){

            angular.bootstrap(document, ["geobarApp"]);

        }


        

           /* alert('onMapReady ..');

            alert( 'map.setOptions ..' );
            var opts = {
                'controls': { 
                    'myLocationButton': true,
                    'zoom': true 
                },
                'gestures': { 'gestures': true },
                'camera': { 'zoom': 10 }
            };
            map.setOptions( opts );
            alert( 'map.setBackgroundColor ..' );
            map.setBackgroundColor( 'transparent' );
            alert( 'map.setMapTypeId ..' );
            map.setMapTypeId( plugin.google.maps.MapTypeId.ROADMAP );

            alert( 'map.setDiv ..' );
            var mapDiv = document.getElementById( 'google_map' );
            map.setDiv( mapDiv );

            alert('onMapReady done');
        */

            
      
        

        


       
    }
};
